const express = require('express');
const searchController = require('./searchController');

let searchRoute = express.Router();

// Routing for products
searchRoute.post('/getSearchProducts',searchController.getSearchProducts)
searchRoute.post('/product/search',searchController.getSearchProductsPage)



module.exports = searchRoute;