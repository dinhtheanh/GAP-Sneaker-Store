const express = require("express");
const router = express.Router();
const userController = require('./accountController.js')

router.post('/sign-up', userController.createUser);
router.post('/log-in', userController.loginUser);

module.exports = router