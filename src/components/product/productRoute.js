const express = require('express');
const productsController = require('./productController');

let productsRoute = express.Router();

// Routing for products
productsRoute.get('/', productsController.getProductsPage);

productsRoute.get('/:productid', productsController.getProductDetailPage);

module.exports = productsRoute;