const express = require('express');
const adminController = require('./adminController');
let adminRoute = express.Router();

// Routing for products
adminRoute.get('/customerstable', adminController.getCustomerListPage);

//adminRoute.get('/', adminController.getHomePage);

adminRoute.get('/accountsettings', adminController.getAccountSettingsPage);

adminRoute.get('/orders', adminController.getOrderPage);

adminRoute.get('/productlist', adminController.getProductListPage);

adminRoute.get('/addProductForm', adminController.getAddProductPage);

adminRoute.get('/dashboard', adminController.getMaintenancePage);

module.exports = adminRoute;