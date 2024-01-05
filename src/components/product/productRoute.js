const express = require('express');
const productsController = require('./productController');
const isAuthenticated = require('../account/isAuthenticated')
let productsRoute = express.Router();
const cartController = require('../cart/cartController')

// Routing for products
productsRoute.get('/', productsController.getProductsPage);

productsRoute.get('/:productid', productsController.getProductDetailPage);

productsRoute.post('/:productid/addtocart', isAuthenticated,cartController.addToCart);






module.exports = productsRoute;