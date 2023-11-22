const express = require('express');
let myRoute = express.Router();
const productsRoute = require('../components/product/productRoute');
const userController = require('../components/account/accountController');
const adminRoute = require('../components/admin/adminRoute');



    myRoute.get('/contact', (req, res) => {
        res.render("customer/navbar/contact", { layout: "customer/layout" });
    });

    myRoute.post('/create-user', userController.createUser);

    myRoute.get('/account', (req, res) => {
        res.render("customer/navbar/account", { layout: "customer/layout" });
    });

    myRoute.get(['/', '/home'], (req, res) => {
        res.render("customer/navbar/home", { layout: "customer/layout" });
    });

    myRoute.use('/products', productsRoute);

    myRoute.get('/about', (req, res) => {
        res.render("customer/navbar/about", { layout: "customer/layout" });
    });

    myRoute.use('/admin', adminRoute);




module.exports = myRoute;