const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
    category_id:{
        type: String,
        required: true
    },
    meta_title:{
        type: String,
        required: true
    },
    meta_keywords:{
        type: String,
        required: true 
    },
    meta_description:{
        type: String,
        required: true 
    },
    footer_title:{
        type: String,
        required: true 
    },
    footer_description:{
        type: String,
        required: true 
    },
});

module.exports = mongoose.model("category_seo", seoSchema);