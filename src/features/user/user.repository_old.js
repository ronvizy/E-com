import { getDB } from "../../config/mongodb.js";
import dotenv from 'dotenv';
dotenv.config();
class UserRepository{

    constructor(){
        //passing the value of collection as users; so that I dont have to hard code it everytime I call collection method
        this.collection = 'users'
    }

    async signUp(newUser){

        try{
         //get database
         const db= getDB();
 
         //get the collection
        //  const collection = db.collection("users");
         const collection = db.collection(this.collection);
         
         //Insert the document.
         const insertedResult = await collection.insertOne(newUser);
         console.log('Inserted documents =>', insertedResult);
        }catch(err){
         console.log("Error: ",err);
        }
         
    }

    // async signIn(email, password){

    //     try{
    //      //get database
    //      const db= getDB();
 
    //      //get the collection
    //      const collection = db.collection("users");
         
    //      //find the document.
        
    //      const findUser = await collection.findOne({email, password});
    //      console.log('User fetched =>', findUser);
    //      return findUser
    //     }catch(err){
    //      console.log("Error: ",err);
    //     }
         
    // }
    async findByEmail(email){

        try{
         //get database
         const db= getDB();
 
         //get the collection
        //  const collection = db.collection("users");
         const collection = db.collection(this.collection);
         
         //find the document.
        console.log(email)
         const findUser = await collection.findOne({email});
         
         console.log('User fetched =>', findUser);
         return findUser
        }catch(err){
            throw new Error(err);
        //  console.log("Error: ",err);
        }
         
    }

}

export default UserRepository