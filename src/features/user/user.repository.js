import mongoose from "mongoose";
import { userSchema } from "./user.schecma.js";
import { ObjectId } from "mongodb";



const userModel =  mongoose.model('Users', userSchema);

export default class UserRepository{

    async resetPassword(userID, password){
        try {
            // userID =  new ObjectId(userID);
            console.log("user ID: ",userID);
            let user = await userModel.findById(userID);
            console.log(user);
            user.password = password;
            user.save();
       } catch (error) {
            console.log(error)
            throw new Error(error)
       }
    }
 
    async signUp(user){
      try {
            //create instance
            const newUser = new userModel(user)
            await newUser.save();
            return newUser;
        }catch (error) {
            console.log("Error in signUp: ")
            console.log(error);
    }
    }

    async singIn(email, password){
        try {
            //create instance
            return await userModel.findOne({email, password});

        } catch (error) {
          console.log("Error in signIn: ")
          console.log(err);
        }
    }

    async findByEmail(email){
        try {
            //create instance
            console.log("\n\nInside sign in using new repo\n\n");

            return await userModel.findOne({email});

        } catch (error) {
          console.log("Error in findByEmail: ")
          console.log(err);
        }
    }
}