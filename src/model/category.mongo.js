const mongoose = require('mongoose');

const categoryschema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    title_slug:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model("category", categoryschema);