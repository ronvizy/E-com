import express from "express";
import UserController from './user.controller.js'
import jwtAuth from "../../middlewares/jwt.middleware.js";

const userRouter = express.Router();
const userController = new UserController();
// const userController = UserController();


// userRouter.post('/signin', userController.signIn)

userRouter.post('/signIn', (req, res, next)=>{
    userController.signIn(req,res, next);
})

// we are not calling signup function but we are just passing the reference of signup function. The problem with this approach is we cant bind "this" keyword with the reference 
// userRouter.post('/signup', userController.signUp)

//we are here calling the sign up function and there will be no errors when we will be using the "this" keyword because we can bind the 'this' keyword using this approach
userRouter.post('/signup', (req, res)=>{
    //using this way of calling controller, 'this' keyword can be accessed
    userController.signUp(req, res);
});

userRouter.post('/resetPassword', jwtAuth, (req, res) =>{
    userController.resetPassword(req, res);
});

export default userRouter;