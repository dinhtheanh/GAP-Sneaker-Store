// adminRoute.js
const express = require('express');
const adminController = require('./adminController');
let adminRoute = express.Router();
const productRouter = require('../product/productRoute')
const productController = require('../product/productController')
// Routing for products

adminRoute.get('/', adminController.getHomePage);

adminRoute.get('/customerstable', adminController.getCustomerListPage);

adminRoute.get('/accountsettings', adminController.getAccountSettingsPage);

adminRoute.get('/orders', adminController.getOrderPage);

adminRoute.get('/productlist', adminController.getProductListPage);

adminRoute.get('/addProductForm', adminController.getAddProductPage);

adminRoute.post('/admin/addProductForm',productController.addProduct);

adminRoute.get('/dashboard', adminController.getMaintenancePage);

module.exports = adminRoute;