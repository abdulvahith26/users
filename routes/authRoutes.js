const express = require('express');
const authController = require('../controlllers/authController');

//router

const authRouter = express.Router();

//end points
authRouter.post('/register', authController.register,);
authRouter.post('/login' , authController.login);
authRouter.post('/logout' , authController.logout);
 
module.exports = authRouter; 