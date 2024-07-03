import mongoose from "mongoose";

const cartSchema =  new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
        //ref means the collection it refers to
        ref:"User"
    },
    productId: {type: mongoose.Schema.Types.ObjectId,
        //ref means the collection it refers to
        ref:"Product"
    },
    quantity: Number
})