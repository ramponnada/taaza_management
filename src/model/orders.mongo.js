const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ordersSchema = new Schema({
    userid: Schema.Types.ObjectId,
    items:[],
    totals: Number,
    delivery: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model("orders", ordersSchema);