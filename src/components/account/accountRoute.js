const express = require("express");
const router = express.Router();
const userController = require('./accountController.js')

router.post('/create-user', userController.createUser);

module.exports = router