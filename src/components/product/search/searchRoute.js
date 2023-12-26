const express = require('express');
const searchController = require('./searchController');
const productController = require('../productController')

let searchRoute = express.Router();

// Routing for products
searchRoute.post('/getSearchProducts',searchController.getSearchProducts)
searchRoute.post('/products',productController.getProductsPage)



module.exports = searchRoute;