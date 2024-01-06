const express = require('express');
let myRoute = express.Router();
const productsRoute = require('../components/product/productRoute');
const userRouter = require('../components/account/accountRoute');
const adminRoute = require('../components/admin/adminRoute');
const homeRoute = require('../components/home/homeRoute');
const searchRoute = require('../components/product/search/searchRoute')
const reviewRoute = require('../components/product/review/reviewRoute')
const cartRoute = require('../components/cart/cartRoute')
const orderRoute = require('../components/order/orderRoute')
const passport = require('passport');
const isAuthenticated = require('../components/account/isAuthenticated');

myRoute.use('/', searchRoute);
myRoute.use('/admin', isAuthenticated, adminRoute);
myRoute.use('/cart',isAuthenticated,cartRoute);
myRoute.use('/orderlist',isAuthenticated,orderRoute);
myRoute.get('/countProduct', (req, res) => {
    if(!req.user)
    return;
    const totalQuantity = req.user.cart.reduce((total, item) => total + item.quantity, 0);
    res.json({ count: totalQuantity });
});

myRoute.get('/confirm', (req, res) => {
    res.render("customer/navbar/confirm", { layout: "customer/layout", activeTab: 'about' });
});

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



myRoute.get('/profile',isAuthenticated, (req, res) => {
    res.render("customer/protectPage", { layout: "customer/layout", user: req.user });
});

myRoute.use('/update-profile', userRouter.handleChangeProfile(myRoute));

myRoute.get('/change-password',isAuthenticated, (req, res) => {
    res.render("customer/navbar/changePassword", { layout: "customer/layout" });
});
myRoute.use('/update-password',isAuthenticated, userRouter.handleChangePassword(myRoute));
myRoute.use('/reset-password', userRouter.handleResetPassword(myRoute));



myRoute.get('/log-out', userRouter.handleLogout(myRoute));
myRoute.use('/review', isAuthenticated,reviewRoute);






module.exports = myRoute;