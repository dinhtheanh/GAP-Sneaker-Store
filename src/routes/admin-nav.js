const adminRoute = require('../components/admin/adminRoute');
const express = require('express');
let myRoute = express.Router();

myRoute.use('/', adminRoute);

module.exports = myRoute;