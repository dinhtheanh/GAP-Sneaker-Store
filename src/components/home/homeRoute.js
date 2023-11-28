const express = require('express');
const homeController = require('./homeController');
let homeRoute = express.Router();

// Routing for home
homeRoute.get('/', homeController.gethomePage);

homeRoute.get('/home', homeController.gethomePage);


module.exports = homeRoute;