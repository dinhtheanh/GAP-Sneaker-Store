const express = require('express');
const productsController = require('./productController');

let productsRoute = express.Router();

// Routing for products
productsRoute.get('/', productsController.getProductsPage);

productsRoute.get('/:productid', productsController.getProductDetailPage);

productsRoute.post('/:productid/addtocart', productsController.getProductDetailPage);






module.exports = productsRoute;