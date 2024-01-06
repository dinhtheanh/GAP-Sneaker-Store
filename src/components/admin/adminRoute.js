// adminRoute.js
const express = require('express');
const adminController = require('./adminController');
let adminRoute = express.Router();
const productController = require('../product/productController')
// Routing for products

adminRoute.get('/', adminController.getDashboardPage);

adminRoute.get('/customerstable', adminController.getCustomerListPage);

adminRoute.get('/accountsettings', adminController.getAccountSettingsPage);

adminRoute.get('/orders', adminController.getOrderPage);

adminRoute.get('/productlist', adminController.getProductListPage);

adminRoute.get('/addProductForm', adminController.getAddProductPage);

adminRoute.post('/addProductForm',productController.addProduct); 

adminRoute.get('/dashboard', adminController.getDashboardPage);

adminRoute.get('/api/search', adminController.searchCustomer);

adminRoute.get('/customerstable/:id', adminController.getCustomerDetailsPage);

adminRoute.get('/productlist/:id', adminController.getProductDetailsPage);

adminRoute.get('/api/search-for-products', adminController.searchProduct);

adminRoute.get('/api/sort-and-filter-orders', adminController.sortAndFilterOrder);

adminRoute.get('/orderdetails', adminController.getOrderDetailsPage);

adminRoute.post('/ban/:id', adminController.banUser);

adminRoute.post('/unban/:id', adminController.unbanUser);

adminRoute.post('/update-product', adminController.updateProduct);

adminRoute.get('/orders/:id', adminController.getOrderDetailsPage);

adminRoute.post('/change-profile', adminController.changeAdminProfile);

adminRoute.post('/upload-product-image', adminController.uploadImageProduct);

adminRoute.post('/delete-product-image', adminController.deleteProductImage);

adminRoute.put('/api/update-order-status', adminController.updateOrderStatus);

adminRoute.post('/api/revenue-report', adminController.getRevenueReport);

adminRoute.post('/api/revenue-report-by-product', adminController.getRevenueReportByProduct);

adminRoute.post('/api/change-password', adminController.changePassword);

module.exports = adminRoute;