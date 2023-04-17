const { validationResult } = require('express-validator');
const categoryModel = require('../model/category.model');

async function categoryTable(req,res){
    const all_categories = await categoryModel.fetch_all_categories();   
    res.render("categories_table",{all_categories : all_categories,errors: req.flash('error')});
}
function add_category(req,res){
    res.render("add_category",{path: req.path.toString(), message: req.flash('message'), error: req.flash('error')});    
    console.log(req.flash('error'));
}
async function category_post(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){               
       req.flash('error', errors.array());
    }else{        
    await categoryModel.create_categoryModel(req.body);
    req.flash('message','saved successfully');
    }
    res.redirect('/category/add_category');
}
async function category_seo(req,res){
    if(await categoryModel.checkCatId(req.params.id) !== null ){
        let catSeoId = await categoryModel.fetch_single_category_seo(req.params.id); 
        res.render('cat_seo',{category_id : req.params.id,data : catSeoId,message: req.flash('message'), errors: req.flash('error')});
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}
async function category_seo_post(req,res){
    if(await categoryModel.checkCatId(req.params.id) !== null ){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){                   
     }else{
        await categoryModel.create_category_seo(req.body, req.params.id);        
        req.flash('message','saved successfully');
     }
     res.redirect('/category/seo/' + req.params.id);
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}
async function category_seo_update(req,res){
    if(await categoryModel.checkCatId(req.params.id) !== null ){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){                   
     }else{
        await categoryModel.update_category_seo(req.body, req.params.id);        
        req.flash('message','saved successfully');
     }
     res.redirect('/category/seo/' + req.params.id);
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}
// async function checkCategoryId(id){
//     await categoryModel.findOne
// }
async function category_edit(req,res){
    let categoryById = await categoryModel.fetch_single_category(req.params.id);         
    if(categoryById !== null){
        res.render('category_edit',{category_id : req.params.id,message: req.flash('message'), errors: req.flash('error'),data: categoryById});
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }           
}
async function category_delete(req,res){        
    let delbyId = await categoryModel.delete_single_category(req.params.id); 
    //let delbycatref = await categoryseo.deletecategoryIdRefer(req.params.id);   
    if(delbyId['deletedCount'] === 0){
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }    
    res.redirect('/category');
}
async function category_update(req,res){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){  
        req.flash('error', errors.array());                 
     }else{
        await categoryModel.update_single_category(req.body, req.params.id);        
        req.flash('message','saved successfully');
     }
     res.redirect('/category/edit/' + req.params.id);
}
module.exports = {
    categoryTable,
    add_category,
    category_post,
    category_seo,
    category_seo_post,
    category_edit,
    category_update,
    category_delete,
    category_seo_update
}