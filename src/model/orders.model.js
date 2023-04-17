const orders_mongoose = require('./orders.mongo');

async function get_allOrders(){
    return await orders_mongoose.find({});
}

module.exports = {
    get_allOrders
}