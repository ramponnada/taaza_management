const express = require('express');
const ordersRouter = express.Router();
const ordersController = require('./orders.controller');

ordersRouter.get('/', ordersController.orders_table);

module.exports = {
    ordersRouter
}