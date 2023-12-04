const express = require('express');
let myRoute = express.Router();
const productsRoute = require('../components/product/productRoute');
const userRouter = require('../components/account/accountRoute');
const adminRoute = require('../components/admin/adminRoute');
const homeRoute = require('../components/home/homeRoute');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // If not authenticated, redirect to a login page or return an error
    res.redirect('/log-in'); // or res.status(401).send('Not authenticated');
}

myRoute.use('/admin', adminRoute);

myRoute.use('/', homeRoute);

myRoute.use('/products', productsRoute);

myRoute.get('/about', (req, res) => {
    res.render("customer/navbar/about", { layout: "customer/layout", activeTab: 'about' });
});

myRoute.get('/contact', (req, res) => {
    res.render("customer/navbar/contact", { layout: "customer/layout", activeTab: 'contact' });
});

myRoute.use('/sign-up', userRouter.handleSignUp(myRoute));

myRoute.use('/log-in', userRouter.handleLogin(myRoute));

myRoute.get('/protect', isAuthenticated, (req, res) => {
    res.render("customer/protectPage", { layout: "customer/layout", user: req.user });
});

myRoute.get('/log-out', userRouter.handleLogout(myRoute));







module.exports = myRoute;