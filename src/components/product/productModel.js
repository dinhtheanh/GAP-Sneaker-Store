// Data model for product
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    img: String,
    gender: String,
    brand: String,
    category: String,
    size: [Number],
});

const Product = mongoose.model("product", productSchema, 'product');

module.exports = Product;