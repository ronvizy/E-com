import { getDB } from "../../config/mongodb.js";
import {MongoClient, ObjectId } from "mongodb";

 class ProductRepository{
   constructor(){
      this.collection = 'products'
   }
   async add(newProduct){
      try{
         //getting database
         const db = getDB();

         //get the collection
         const collection = db.collection(this.collection);

         //insert the document.
         await collection.insertOne(newProduct);
         return newProduct;
         // console.log("Inserted Product => ",newProduct);
         // return newProduct;
      }catch(err){
         console.log(err)
      }
   }

   async getAll(){
      try{
         //getting db
         const db =getDB();
         console.log("Fetching all")
         //getting the collection
         const collection = db.collection(this.collection);
         
         //getting all products
         //mongoDb projection operator is used to fetch the specific details .project({});
         const products = await collection.find().project({_id:0,name:1, desc:1, price:1, averageRating:1}).toArray();
         // console.log("fetched products from collection => ", products);
         return products;
      }catch(err){
         console.log(err);
      }
   }

   async get(id){
      try{
         const db = getDB();
         const collection = db.collection(this.collection);
         console.log(id);
         const product = await collection.findOne({_id: new ObjectId(id)});
         if(!product){
            throw new Error("Product does not exist");
         }
         console.log("Product::: ", product);
         return product;
      }catch(err){
         console.log(err);
         // throw new ApplicationError("Something went wrong with database", 500);
     }
   }
    
   async rating(userId, productId, rating){
      try{
         const db = getDB();
         const collection = db.collection(this.collection);
         rating = parseFloat(rating);

         const rateProduct={userId, productId, rating, timestamp: new Date().toISOString()};
         console.log(rateProduct);
         const product = await collection.findOne({_id: new ObjectId(productId)});
         console.log(product);
         
         if(!product){
            throw new Error("Product does not exist");
         }

         if (!product.ratings) {
            product.ratings = {};
            await collection.updateOne({_id: new ObjectId(productId)},{$set: {averageRating: 0}})
          }
          let existingRating=0;
          if(product.ratings[userId]){
            console.log("User exist::", product.ratings[userId]);
            existingRating = product.ratings[userId];
            existingRating = existingRating/Object.values(product.ratings).length;
            console.log("existingRating:: ", existingRating);

          }
          // Add the new rating to the ratings array
         product.ratings[userId]= {rating, timestamp: new Date().toISOString()}
         
         let average = 0;
         Object.values(product.ratings).forEach(Userrating=>{
            average = average+Userrating.rating
         })
         
         console.log("average:: ", average);
         average = average/Object.values(product.ratings).length;
         console.log("Average Rating:: ", average);
         
         let rate = Object.keys(product.ratings);
      
         console.log("users:: ",rate);

         await collection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: { ratings: product.ratings, averageRating: average } }
          );
         
     }catch(err){
         console.log(err);
         // throw new ApplicationError("Something went wrong with database", 500);
     }
    }

    async getFiltered(minPrice, maxPrice, category){
      try{
         const db= getDB();
         const collection = db.collection(this.collection);
         let filterExpression={};
         console.log("minPrice::",minPrice)
         if(minPrice){
            filterExpression.price = {$gte:minPrice};
         }
         if(maxPrice){
            filterExpression.price = {...filterExpression.price, $lte:maxPrice};
         }
         if(category){
            filterExpression.category = category;
         }

         const products =await collection.find(filterExpression).toArray();
         console.log(products);
         return products
      }catch(err){
         console.log(err);
      }
    }
    
    async getAverageRating(){
      try{
         const db = getDB();
         const collection = await db.collection(this.collection);
         const avgx =  collection.aggregate([
            {
               $unwind:"$ratings"
            },
            {
               $group:{
                  _id:"$name",
                  averageRating:{$avg:"$ratings.rating"}
               }
            }
         ]
         )
         console.log(avgx);
         return avgx;
         

      }catch(err){
         console.log(err);
      }
    }
 }
 export default ProductRepository;