

import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basic.auth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import CartRouter from "./src/features/cart/cart.route.js";

const server = express();

server.use(bodyParser.json());

server.get('/', function(req, res){
    res.send("Welcome to e-com-APIs server")
    
});

//for all requests related to products, redirect to product routes
//localhost:3200/api/products
server.use(
    '/api/products', 
    // basicAuthorizer,
    jwtAuth,
    ProductRouter
);
server.use('/api/users', UserRouter);

server.use(
    '/api/cart',
    jwtAuth, 
    CartRouter
);


server.listen(3000, ()=>{
    console.log("server is running at port 3000");
});
