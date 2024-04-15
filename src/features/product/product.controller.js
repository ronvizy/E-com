
import productModel from "./product.model.js";

export default class ProductController{
    
    getAllProducts(req, res){
        const products = productModel.getALL();
        // console.log(products);
        res.status(200).send(products);
    }

    addProduct(req, res){
        const { name, desc,  price, sizes, category} = req.body;
        const newProduct = {
            name,
            desc,
            price: parseFloat(price), 
            imageUrl: req.file.filename,
            category,
            sizes:sizes.split(','),
        };
       const createdRecord=productModel.add(newProduct);
        res.status(200).send(createdRecord);
    }

    rateProduct(req, res){

    }

    getOneProduct(req, res){
        const id=req.params.id;
        console.log(id);
        const product= productModel.get(id);
        if(!product){
            res.status(404).send("Product Not Found")  
        }else{
            return res.status(200).send(product)
        }
        
    }

    getFilterProducts(req, res){
       const minPrice = req.query.minPrice;
       const maxPrice = req.query.maxPrice;
       const category = req.query.category;
       
        console.log(minPrice + " " + maxPrice + " " + category);
        const products=productModel.filterProducts(minPrice, maxPrice, category)
        if(!products){
            return res.status(404).send("No Products found");
        }
        res.status(200).send(products);
    }

    rateProduct(req, res){
        const userId = req.query.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;
        // console.log("Inside prodct controller: "+userId);
        const error = productModel.rateProduct(userId, productId, rating);

        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send('rating added');
        }

    }
}