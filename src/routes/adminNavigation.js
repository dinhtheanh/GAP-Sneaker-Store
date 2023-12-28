// Initialize express router
const express = require('express');
let myRoute = express.Router();

const adminRoute = require('../components/admin/adminRoute');

myRoute.use('/admin', adminRoute);