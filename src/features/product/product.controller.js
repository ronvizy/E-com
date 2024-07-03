
import ProductRepository from "./product.repository.js";
import productModel from "./product.model.js";


export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res, next){
        try{
            // console.log("Hello")
            const products = await this.productRepository.getAll();
            return res.status(200).send(products);
        }catch(err){
            console.log(err);
            next(err);
            // return res.status(200).send("Something went wrong");
        }
    }

    async addProduct(req, res, next){

        // const { name, desc,  price, sizes, category} = req.body;
        console.log("Inside add prod");
        console.log(req.file.filename)
        try {
            console.log("Inside add prod")
            const { name, desc, price, sizes, category, stock, color } = req.body;
            const newProd = new productModel(name, desc, price, req.file.filename, category, sizes.split(","), stock, color);
            // const createdRecord = await this.productRepository.add(newProd);
            console.log(newProd);
            const createdRecord = await this.productRepository.add(newProd);
            console.log(createdRecord);
            return res.status(200).send(createdRecord);
        } catch (err) {
            console.log(err);
            // next(err)
            // return res.status(500).send("Internal Server Error");
        }
    }

    // rateProduct(req, res){

    // }

    async getOneProduct(req, res, next){
        console.log("Inside one product")
        const id=req.params.id;
        console.log(id);
        try{
            const product= await this.productRepository.get(id);
            // console.log('===========', product);
            if(!product){
                res.status(500).send("Product Not Found")  
            }else{
                console.log(product);
                return res.status(200).send(product)
            }
        }catch(err){
            console.log(err);
            next(err);
        }     
    }

    async getFilterProducts(req, res){
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            
            console.log(minPrice + " " + maxPrice + " " + category);
            const products = await this.productRepository.getFiltered(minPrice, maxPrice, category);
            // console.log("Filte")
            return res.status(200).send(products);
        }catch(err){
            console.log(err);
            next(err);
        } 
    }



    async rateProduct(req, res, next) {
        console.log(req.query);
        try{
          const userID = req.userId;
        console.log("userId:::", userID)
          const productID = req.query.productID;
          const rating = req.query.rating;
           await this.productRepository.rating(
            userID,
            productID, 
            rating
            );
            return res
              .status(200)
              .send('Rating has been added');
        } catch(err){
          console.log("Passing error to middleware");
          next(err);
        }
    
        }

        async getAverageRating(req, res, next){
            try{
                console.log("Inside average rating");
                const average = await this.productRepository.getAverageRating();
                console.log(average);
            }catch(err){
                console.log(err);
            }
        }
}