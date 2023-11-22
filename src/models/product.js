const mongoose =require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, require:true, unique:true},
    img: {type: String, require:true},
    price: {type: Number, require:true},
    gender: {type: String, require:true},
    price: {type:Number , require:true},
    size: {type: [Number] , require:true},
    brand: {type: String , require:true},
    category: {type: String , require:true}






})
   
const User = mongoose.model('product',productSchema);
module.exports = User;