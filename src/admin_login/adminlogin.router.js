const express = require('express');
const adminloginRouter = express.Router();
const adminloginController = require('./adminlogin.controller');

adminloginRouter.get('/login', adminloginController.loginPage);
adminloginRouter.post('/login', adminloginController.authenticateuser);
adminloginRouter.get('/logout', adminloginController.logout);

module.exports = {
    adminloginRouter
}