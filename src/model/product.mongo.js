const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    title_slug:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required : true
    },
    qty:{
        type: Number,
        required: true
    },
    price1:{
        type: Number,
        required: true
    },
    qty1:{
        type: Number,
        required: true
    },
    image: [Object],
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model("products", productschema);

