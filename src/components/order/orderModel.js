const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        required: true,
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product',required: true },
        quantity : {type : Number} // This should be the correct reference to the product schema
    }],
    totalPay: {
        type: Number,
        required: true,
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Order comfirming"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
