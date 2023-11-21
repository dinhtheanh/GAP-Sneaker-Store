const express = require('express');
const productsController = require('./productController');
let productsRoute = express.Router();

productsRoute.get('/', productsController.getProductsPage);

module.exports = productsRoute;