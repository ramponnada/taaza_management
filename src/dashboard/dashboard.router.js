const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('./dashboard.controller');
const {checkAuth} = require('../authentication');

dashboardRouter.get('/', [checkAuth],dashboardController.dashboardpage);

module.exports = {
    dashboardRouter
}