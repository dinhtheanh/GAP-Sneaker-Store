const express = require('express');

let myRoute = express.Router();

myRoute.get('/', (req, res) => {
    res.render("products/products");
});


module.exports = myRoute;