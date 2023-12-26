const express = require('express');
const cartController = require('./cartController');

let cartRoute = express.Router();

// Routing for products

cartRoute.get('/', cartController.getProductCartPage);





module.exports = cartRoute;