
import UserModle from './user.model.js';
import jwt from 'jsonwebtoken';

export default class UserController{

    signUp(req, res){
        const {name, email, password, type} = req.body;
        // console.log(req.body.email);
        const result=UserModle.signUp(name, email, password, type);
        res.status(200).send(result)
    };

    signIn(req,res){
        // console.log("checking: "+req.body.email);
        const result = UserModle.signIn(req.body.email, req.body.password);
        console.log("result: "+result);
        if(!result){
            return res.status(400).send("Incorrect credentials");
        }
        else{
            const token= jwt.sign(
                {userId: result.id, email: result.email}, 
                "uay1sVck8BD0cpbdBo8eydOpgE8xkifl", 
                {expiresIn:"1h"})
                res.status(200).send(token);
        }
        
    };
    
}