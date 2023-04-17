const express = require('express');
const commonRouter = express.Router();
const dashboardRouter = require('./dashboard/dashboard.router');
const categoryRouter = require('./categories/categories.router');
const productRouter = require('./products/products.router');
const usersRouter = require('./users/users.router');
const ordersRouter = require('./orders/orders.router');
const loginRouter = require('./admin_login/adminlogin.router');

commonRouter.use('/authentication', loginRouter.adminloginRouter);
commonRouter.use('/', dashboardRouter.dashboardRouter);
commonRouter.use('/category', categoryRouter.categoryRouter);
commonRouter.use('/products', productRouter.productRouter);
commonRouter.use('/users', usersRouter.usersRouter);
commonRouter.use('/orders', ordersRouter.ordersRouter);


module.exports = {
    commonRouter
}