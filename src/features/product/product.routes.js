//manage routes/paths to product controller

//import express
import express from 'express';
import ProductController from './product.controller.js';
import {uploadFile} from '../../middlewares/fileUpload.middleware.js';
import basicAuthorizer from '../../middlewares/basic.auth.middleware.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

//2. initialize Express
const productRouter =  express.Router();

const productController= new ProductController();

//all the paths to controller methods
productRouter.get('/',jwtAuth, productController.getAllProducts);
productRouter.get('/filter',jwtAuth, productController.getFilterProducts);
productRouter.post(
    '/',
    basicAuthorizer,
    uploadFile.single('imageUrl'),
    productController.addProduct
    );

productRouter.get('/:id', productController.getOneProduct);

productRouter.post('/rate', jwtAuth, productController.rateProduct);


export default productRouter;

//