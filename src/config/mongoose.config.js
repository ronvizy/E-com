//install mongoose using "npm i mongoose"

import mongoose from "mongoose";
import dotenv from "dotenv";

//to get the access of environment variables from .env file
dotenv.config();

export const connectUsingMongoose = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log("Error while connecting to mongoose:");
        console.log(err);
    }
    

}