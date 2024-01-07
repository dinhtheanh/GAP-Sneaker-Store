const express = require('express');
const cartController = require('./cartController');

let cartRoute = express.Router();

// Routing for products

cartRoute.get('/', cartController.getProductCartPage);
cartRoute.post('/submitCheckout', cartController.submitCheckout);
cartRoute.post('/deleteProduct', cartController.deleteProduct);





module.exports = cartRoute;