const mongoose =require('mongoose')

const orderSchema = new mongoose.Schema({
   
    },
    {
        timestamps:true
    })
const User = mongoose.model('Order',orderSchema);
module.exports = User;