//manage routes/paths to product controller

//import express
import express from 'express';
import ProductController from './product.controller.js';
import {uploadFile} from '../../middlewares/fileUpload.middleware.js';
// import basicAuthorizer from '../../middlewares/basic.auth.middleware.js';


//2. initialize Express
const productRouter =  express.Router();

const productController= new ProductController();

// all the paths to controller methods
productRouter.get('/',   (req, res, next)=>{productController.getAllProducts(req, res, next)});
productRouter.get('/filter', (req, res)=>{productController.getFilterProducts(req, res)});
productRouter.post(
    '/',
    uploadFile.single('imageUrl'),
    (req,res)=>{
        productController.addProduct(req, res)
    }
    );

productRouter.get('/:id', (req, res)=>{
    console.log("called getoneProduct::\n");
    productController.getOneProduct(req, res)});

productRouter.post('/rate',  (req, res, next)=>{productController.rateProduct(req, res, next)});
// productRouter.get('/average',(req, res, next)=>{productController.getAverageRating(req, res, next)} )

export default productRouter;

//