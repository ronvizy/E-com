
import UserModle from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from "bcrypt"

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async resetPassword(req, res){
        const {newPassword, confirtmPassword} = req.body;
        const userID = req.userId
        if(! newPassword === confirtmPassword){
            console.log('Password Does not match!')
            res.status(501).send("confirm password does not match")
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        try {
            await this.userRepository.resetPassword(userID, hashedPassword);
            res.status(201).send("Password updated")
        } catch (error) {
            console.log(error);
            res.status(501).send("Something went wrong");
        }
    }

    async signUp(req, res){
        try{
        const {name, email, password, type} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user=new UserModle(name, email, password, type);
        console.log(hashedPassword);
        await this.userRepository.signUp(user);
        const response= {user:user.name, email:user.email, type:user.type};
        res.status(201).send(response)
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong");
        }
    };

    async signIn(req,res, next){
         console.log("checking: "+req.body.email);
        try{
            //finding user by email
            const user = await this.userRepository.findByEmail(req.body.email);
            console.log(user)
            if(!user){
                throw new Error("Invalid Email!");
                // return res.status(400).send("Incorrect email");
            }else{
                //compare password with hashed password
                console.log("Entered password: ",req.body.password," Stored Password: ", user.password);
                const result = await bcrypt.compare(req.body.password, user.password);
                console.log("Result: ", result);
                if(result){
                    //create token
                    const token= jwt.sign(
                    {userId: user._id, email: user.email}, 
                    
                    //secretKey
                    process.env.JWT_SECRET, 
                    {expiresIn:"1h"})
                    //send token
                    res.status(200).send(token);
                }else{
                    // throw new Error("Incorrect Password");
                    return res.status(400).send("Incorrect password");
                }
            }
        }catch(err){
            //errors from database
        console.log(err);
        next(err);
        
        // return res.status(500).error("Something went wrong");
    }
        
    };
    
}