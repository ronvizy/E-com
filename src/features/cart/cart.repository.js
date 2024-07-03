import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class CartRespository{
    constructor(){
        this.collection = 'cart';
    } 

    // async add(productID, userID, quantity, color, size){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         const productsCollection= db.collection('products');
            
    //         const product = await productsCollection.findOne({_id: new ObjectId(productID)});
            
    //         // if(!product){
    //         //   throw new Error("Product may does not Exist or may be sold out");
    //         // }
    //         const productDetails={};
    //         productDetails.productId = new ObjectId(productID);
    //         productDetails.name = product.name;
    //         productDetails.description = product.desc;
    //         productDetails.image = product.imageUrl;
    //         productDetails.quantity= quantity;
    //         productDetails.price = product.price
    //         productDetails.color = color;
    //         productDetails.size = size;
            
    //         const productKey = productID + color + size;
    //     //insert the document.
    //     const userExist = await collection.findOne({userID: new ObjectId(userID)})
    //     // console.log(userExist);

    //     if(userExist){   
    //         const productExist = userExist.cart[productKey]
    //         if(productExist){
    //             throw new Error("Product already exist");
    //         }else{
    //             userExist.cart[productKey]=productDetails;
    //             await collection.updateOne({ userID: new ObjectId(userID) },
    //             { $set: { cart: userExist.cart } })
    //             console.log("new product added in the existing user!!", userExist.cart);
    //         }

    //     }else{
    //         // console.log("User is new");
    //         const cart= {};
    //         cart[productKey]=productDetails
    //         await collection.insertOne({userID: new ObjectId(userID), cart});
    //     }

    //      return null
    //     }catch(err){
    //         return Error(err);
    //     }

    // }

    async add(productID, userID, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const productIDObj = new ObjectId(productID);
            const userIDObj = new ObjectId(userID);
            quantity = Number(quantity);

            // Insert or update the document with the given productID and userID
            const result = await collection.updateOne(
                { productID: productIDObj, userID: userIDObj },
                {
                    $setOnInsert: { productID: productIDObj, userID: userIDObj },
                    $inc: { quantity: quantity }
                },
                { upsert: true }
            );

            if (result.upsertedCount > 0) {
                console.log("New product added to the cart!!");
            } else {
                console.log("Product quantity updated in the cart!!");
            }

            return null;
        } catch (err) {
            console.log("Error: ", err);
            throw new ApplicationError("Something went wrong with the database", 500);
        }
    }

    async getAll(userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const userData = await collection.findOne({userID: new ObjectId(userID)});
            if(!userData){
                return null;
                // throw new Error("Cart is empty!")
            }
            const cart = userData.cart;
            return cart;
        }catch(err){
            console.log(err);
            return Error(err);
        }
    }

    async deleteItem(userID, productID){
        try{
            // productKey+="";
            const db = getDB();
            const collection = db.collection(this.collection);
            const userData = await collection.findOne({userID: new ObjectId(userID)});
            console.log("Product Key:: ", productKey);
            if(!userData || !userData.cart){
                // return null;
                 throw new Error("Cart is empty!")
            }
            console.log("Deleting data!!")
            const product = userData.cart[productKey];
            if(!product){
                throw new Error("Product does not exist")
            }
            console.log("Product:: ",product);
            let updateCart = userData.cart;
            const update = delete updateCart[productKey];
            console.log("updated cart", updateCart, "\nexisting cart:: ", userData.cart);
            const result =  await collection.updateOne(
                { userID: new ObjectId(userID) },
                { $set: { cart:  updateCart } }
            );
            return result
            
        }catch(err){
            return Error(err);
        }

    }
}