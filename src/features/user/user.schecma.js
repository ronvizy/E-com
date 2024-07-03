import mongoose from "mongoose";
console.log("Errorrrrr")
export const userSchema = new mongoose.Schema({
    name: {type:String, required: true, match:[/.+\@.+\../, "Please enter a valid email"]},
    email: {type:String, unique:true, required:true},
    password: {type:String,validate:{
        validator: function(value){
            //              special charater, alphabet character, and lentgth 8-12
            console.log("here:  ")
            return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&],{8-12}$/.test(value);
            //this will not work because the password is hashed and the length will be more than 8-12
            //to check if it works disable the password
        },
        message:"Password should be between 8-12 character and must have a special character"
    },required: true},
    type: {type:String, enum:["customer", "seller"], required:true}

})