// adminRoute.js
const express = require('express');
const adminController = require('./adminController');
let adminRoute = express.Router();
const productController = require('../product/productController')
// Routing for products

adminRoute.get('/', (req, res) => {
    res.send("Admin page");
});

adminRoute.get('/login', adminController.getLoginPage);

adminRoute.get('/customerstable', adminController.getCustomerListPage);

adminRoute.get('/accountsettings', adminController.getAccountSettingsPage);

adminRoute.get('/orders', adminController.getOrderPage);

adminRoute.get('/productlist', adminController.getProductListPage);

adminRoute.get('/addProductForm', adminController.getAddProductPage);

adminRoute.post('/addProductForm',productController.addProduct); 

adminRoute.get('/dashboard', adminController.getMaintenancePage);

adminRoute.get('/api/search', adminController.searchCustomer);

adminRoute.get('/customerstable/:id', adminController.getCustomerDetailsPage);

adminRoute.get('/productlist/:id', adminController.getProductDetailsPage);

adminRoute.get('/api/search-for-products', adminController.searchProduct);

adminRoute.post('/ban/:id', adminController.banUser);

adminRoute.post('/unban/:id', adminController.unbanUser);

adminRoute.post('/update-product', adminController.updateProduct);

adminRoute.post('/change-profile', adminController.changeAdminProfile);

adminRoute.post('/upload-product-image', adminController.uploadImageProduct);

adminRoute.post('/delete-product-image', adminController.deleteProductImage);

module.exports = adminRoute;