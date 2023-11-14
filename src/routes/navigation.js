const express = require('express');
let myRoute = express.Router();
const accountRouter = require('./user.js')

myRoute.get('/contact', (req, res) => {
    res.render("customer/navigation/contact", {layout: "customer/layout"});
});

myRoute.get('/account', (req, res) => {
    res.render("customer/navigation/account", {layout: "customer/layout"});
});

myRoute.use('/account', accountRouter);

 
myRoute.get(['/', '/home'], (req, res) => {
    res.render("customer/navigation/home", {layout: "customer/layout"});
});

myRoute.get('/products', (req, res) => {
    res.render("customer/navigation/products" , {layout: "customer/layout"});
});

myRoute.get('/about', (req, res) => {
    res.render("customer/navigation/about", {layout: "customer/layout"});
});

module.exports = myRoute;
