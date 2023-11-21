const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    img: String
});

const Product = mongoose.model("product", productSchema, 'product');

module.exports = Product;