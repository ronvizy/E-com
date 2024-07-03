import { Double } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    category: String,
    stock: Number,
    imageUrl: String,
    sizes: Array,
    Color: String
});