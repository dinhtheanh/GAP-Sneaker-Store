const express = require('express');
const searchController = require('./searchController');

let searchRoute = express.Router();

// Routing for products
// searchRoute.get('/', searchController.);

// searchRoute.get('/:productid', searchController.getProductDetailPage);



module.exports = searchRoute