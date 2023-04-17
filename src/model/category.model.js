const slug = require('slug');
//const category = require('./category.mongo');
const category_mongoose = require('./category.mongo');
const category_seo_mongoose = require('./category_seo.mongo');

const DEFAULT_USER_ID = 0;

async function getLatestUser_Id(){
    const  AI_user_id = await category_mongoose
    .findOne()
    .sort('-id');
    if(!AI_user_id){
        return DEFAULT_USER_ID;
    }
    return AI_user_id.id;
}

async function checkCatId(id){        
    return await category_mongoose.exists({_id : id});    
}

async function create_categoryModel(c_data){    
    const newUserId = await getLatestUser_Id() + 1;
    let data = {
        id : newUserId,
        title : c_data.title,
        title_slug : slug(c_data.title),
        status : c_data.status
    }  
    await category_mongoose.create(data);    
}

async function fetch_single_category(id){
    return await category_mongoose
    .findById(id,{'__v': 0});
}


async function fetch_all_categories(){
    return await category_mongoose
    .find({}, {'__v': 0});    
}

async function update_single_category(data, id){
    await category_mongoose.updateOne({_id:id},{$set:{title:data.title,title_slug: slug(data.title),status:data.status}});
}

async function delete_single_category(id){
    await category_seo_mongoose.deleteOne({category_id:id});
    return await category_mongoose.deleteOne({_id:id});    
}

async function create_category_seo(c_data, category_id){    
    let data = {
        category_id : category_id,
        meta_title : c_data.meta_title,
        meta_keywords : c_data.meta_keywords,
        meta_description : c_data.meta_description,
        footer_title : c_data.footer_title,
        footer_description : c_data.footer_description,
    }
    await category_seo_mongoose.create(data);
}
async function update_category_seo(c_data, catrgory_id){
    let data = {$set: {      
        meta_title : c_data.meta_title,
        meta_keywords : c_data.meta_keywords,
        meta_description : c_data.meta_description,
        footer_title : c_data.footer_title,
        footer_description : c_data.footer_description,
    }
        }
    await category_seo_mongoose.updateOne({category_id : catrgory_id}, data);
}

async function fetch_single_category_seo(id){   
   return await category_seo_mongoose.findOne({category_id : id},{'__v': 0});
}


module.exports = {
    create_categoryModel,
    fetch_all_categories,
    update_single_category,
    delete_single_category,
    create_category_seo,
    fetch_single_category,
    checkCatId,
    fetch_single_category_seo,
    update_category_seo
};