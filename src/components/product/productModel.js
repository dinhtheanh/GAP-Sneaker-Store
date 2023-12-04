// Data model for product
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    img: [String],
    manufacturer: String,
    category: String,
    size: [Number],
    color: [String]
});

const Product = mongoose.model("product", productSchema, 'product');

module.exports = Product;