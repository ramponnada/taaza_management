const orders = require('../model/orders.model');

async function orders_table(req,res){    
    let allorders = await orders.get_allOrders();    
    res.render("orders_table",{allorders:allorders});
}

module.exports = {
    orders_table
}