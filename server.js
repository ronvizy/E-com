import './env.js'
import express from "express";
import bodyParser from "body-parser";
import  swagger, { serve } from "swagger-ui-express";
import cors from "cors"


import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basic.auth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import CartRouter from "./src/features/cart/cart.route.js";
import OrderRouter from './src/features/order/order.route.js'
import apiDocs from "./openapi.json" assert{type:'json'};
//if we are importing a json file or an api we need to use assert{type:"json"}
import connectToMongoDB from "./src/config/mongodb.js";
import {log ,loggerMiddleware} from './src/middlewares/logger.middleware.js';
import { connectUsingMongoose } from './src/config/mongoose.config.js';

//create server
const server = express();



server.use(bodyParser.json());

// though by default server.use(cors()) will allow all header options, the below code is just to demonstrate how we can configure cors options
var corsOptions = {
    origin : '*',
    allowedHeaders: '*'
}

//using cors library to congure our policy
server.use(cors());


 //or can also use CORS policy mannual cofiguration
// server.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin",'*');//if want to give access to a particular client then the address('http://localhost:5500) of that client should be given in place of "*", "*" is used to give access to all clients or to make it public api
    
   //return ok for preflight request; Preflight request is verification request sent by the client to server before making an actual request. The purpose of preflight request is to check whether the server allows the client to access its resources and it includes specific headers to determine the permissions
//     if(req.method=='OPTIONS'){
//         res.sendStatus(200);
//     }
//     res.header('Access-Control-Allow-Headers', 'Content-Type, authorization'); //to allow all the headers we can use "*" in place of "Content-Type, authorization" or to implement multiple headers but not all, we can comma seperate each of headers

     //by default the value is "*" and will allow all methods but we can restrict the methods that a client can use by speciying the one that we want to allow and then those which are not specified will be blocked
//     res.header('Access-Control-Allow-Method', "*")
//     next();
// })

server.use(loggerMiddleware);
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

server.use('/api/order', jwtAuth, OrderRouter)
server.use((err, req, res, next) => {
    // console.log("hellow")
    // log(err);
    // console.error(err.stack)
    // res.stastus(503).send('Something broke!')

    console.log(err);
//     if (err instanceof ApplicationError){
//         res.status(err.code).send(err.message);
//   }

  // server errors.
  log(err);
  console.error(err.stack)
  res.status(500).send('Something went wrong, please try later');

  })

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

//middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found, Please check our documentation at http://localhost:3000/api-docs")
})

server.listen(3000, ()=>{
    console.log("server is running at port 3000");
    // connectToMongoDB();

    connectUsingMongoose();
});
