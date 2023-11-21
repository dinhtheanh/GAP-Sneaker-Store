const express = require('express');
let myRoute = express.Router();
const productsRoute = require('../components/product/productRoute');


const initRouteWeb = (app) => {
    
    myRoute.get('/contact', (req, res) => {
        res.render("customer/navigation/contact", {layout: "customer/layout"});
    });
    myRoute.get('/account', (req, res) => {
        res.render("customer/navigation/account", {layout: "customer/layout"});
    });
    
    myRoute.get(['/', '/home'], (req, res) => {
        res.render("customer/navigation/home", {layout: "customer/layout"});
    });
    
    myRoute.use('/products', productsRoute);
    
    myRoute.get('/about', (req, res) => {
        res.render("customer/navigation/about", {layout: "customer/layout"});
    });

    myRoute.get('/admin', (req, res) => {
        res.render("admin/layout");
    });

    return app.use("/", myRoute);
}


module.exports = initRouteWeb;