const express = require('express');
const orderController = require('./orderController.js');


const orderRoute = express.Router();

orderRoute.get('/',orderController.getOrderlistPage);


module.exports = orderRoute;