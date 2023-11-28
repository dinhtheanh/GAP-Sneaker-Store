const express = require('express');
let myRoute = express.Router();
const productsRoute = require('../components/product/productRoute');
const userRouter = require('../components/account/accountRoute');
const adminRoute = require('../components/admin/adminRoute');


const initRouteWeb = (app) => {
    
    myRoute.get('/contact', (req, res) => {
        res.render("customer/navbar/contact", { layout: "customer/layout" });
    });


    myRoute.use('/sign-up', userRouter.handleSignUp(myRoute));
    myRoute.use('/log-in', userRouter.handleLogin(myRoute));




    myRoute.get(['/', '/home'], (req, res) => {
        res.render("customer/navbar/home", { layout: "customer/layout" });
    });

    myRoute.use('/products', productsRoute);

    myRoute.get('/about', (req, res) => {
        res.render("customer/navbar/about", { layout: "customer/layout" });
    });

    myRoute.use('/admin', adminRoute);

    return app.use("/", myRoute);
}


module.exports = initRouteWeb;