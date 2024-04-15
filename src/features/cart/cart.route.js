import express from 'express';
import CartController from './cart.controller.js';
// import jwtAuth from "../../middlewares/jwt.middleware.js"

const cartRouter = new express.Router();
const cartController = new CartController();

cartRouter.post('/add', cartController.add);
cartRouter.get('/getall', cartController.getAll);
cartRouter.delete('/delete/:itemId', cartController.delete);

export default cartRouter;
