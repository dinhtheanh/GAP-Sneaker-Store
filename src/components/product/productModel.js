// Data model for product
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    review: {
        type: String,
        required: true,
        trim: true,
    },
});
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    img: [String],
    manufacturer: String,
    category: String,
    size: [Number],
    color: [String],
    reviews: [reviewSchema],
    createdAt: Date,
});

const Product = mongoose.model("product", productSchema, 'product');

module.exports = Product;