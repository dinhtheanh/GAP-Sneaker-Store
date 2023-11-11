const express = require('express');

let myRoute = express.Router();



myRoute.get('/contact', (req, res) => {
    res.render("customer/navigation/contact", {layout: "customer/layout"});
});

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