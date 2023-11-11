const express = require('express');

let myRoute = express.Router();

myRoute.get(['/', '/home'], (req, res) => {
    res.render("home/home", { name: "TheAnh" });
});


module.exports = myRoute;