const slug = require('slug');
const product_mongoose = require('./product.mongo');
const product_seo_mongoose = require('./products_seo.mongo');
const category_mongoose = require('./category.mongo');

const DEFAULT_USER_ID = 0;

async function getLatestUser_Id(){
    const  AI_user_id = await product_mongoose
    .findOne()
    .sort('-id');
    if(!AI_user_id){
        return DEFAULT_USER_ID;
    }
    return AI_user_id.id;
}

async function create_productModel(c_data, image_data){ 
    let imageArray = [];
    image_data.forEach(element => {
        const imgfile = {
            data : element.filename,
            contentType: 'image/jpeg'
        }
        imageArray.push(imgfile);
    });       
    let data = {        
        title : c_data.title,
        title_slug : slug(c_data.title),        
        category : c_data.category_id,
        price : c_data.price,
        qty: c_data.stq,
        price1 : c_data.price2,
        qty1 : c_data.stq2,
        image: imageArray,
        description: c_data.description,
        status : c_data.status
    }
    const checkCatRef = await category_mongoose.findOne({_id: c_data.category_id},{'__v': 0});  
    console.log(checkCatRef);
    if(checkCatRef != null){
    await product_mongoose.create(data);    
    }
}

async function fetch_all_products(){
    return await product_mongoose
    .find({}, {'__v': 0});    
}

async function create_product_seo(c_data, product_id){
    let data = {
        product_id : product_id,
        meta_title : c_data.meta_title,
        meta_keywords : c_data.meta_keywords,
        meta_description : c_data.meta_description,
        footer_title : c_data.footer_title,
        footer_description : c_data.footer_description,
    }
    await product_seo_mongoose.create(data);
}

async function update_product_seo(c_data, product_id){
    let data = {        
        meta_title : c_data.meta_title,
        meta_keywords : c_data.meta_keywords,
        meta_description : c_data.meta_description,
        footer_title : c_data.footer_title,
        footer_description : c_data.footer_description,
    }

    await product_seo_mongoose.updateOne({product_id : product_id}, data);
}

async function checkProId(id){        
    return await product_mongoose.exists({_id : id});    
}

async function fetch_single_product_seo(id){    
    return await product_seo_mongoose.findOne({product_id : id},{'__v': 0});
}

module.exports = {
    create_productModel,
    fetch_all_products,
    create_product_seo,
    checkProId,
    fetch_single_product_seo,
    update_product_seo
}