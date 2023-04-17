const {validationResult} = require('express-validator');
const path = require('path');
const sharp = require('sharp');
const category = require('../model/category.model');
const productModel = require('../model/product.model');


async function products_table(req,res){    
    const all_products = await productModel.fetch_all_products();    
    res.render("products_table", { all_products : all_products});
}
async function addproducts_table(req,res){
    let cat = await category.fetch_all_categories();    
    res.render("add_product",{message: req.flash('message'), errors: req.flash('error'),categoryDrpdown: cat});
}
async function products_post(req,res){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){                   
     }else{
        for(let i = 0 ; i < req.files.length; i++){        
        sharp('E:\\node_practise\\taazapickle\\management\\src\\\\public\\uploads\\' + req.files[i].filename).resize(747,747)
            .jpeg({quality : 50})
            .extract({ left: 24, top: 0, width: 723, height: 747 })
            .toFile('E:\\node_practise\\taazapickle\\management\\src\\public\\uploads\\product-detail-img\\thumb' + req.files[i].filename);
        sharp('E:\\node_practise\\taazapickle\\management\\src\\\\public\\uploads\\' + req.files[i].filename).resize(571,571)
            .jpeg({quality : 50})
            .extract({ left: 111, top: 0, width: 460, height: 571 })
            .toFile('E:\\node_practise\\taazapickle\\management\\src\\public\\uploads\\product-detail-nav-img\\thumb' + req.files[i].filename);            
        }
        await productModel.create_productModel(req.body, req.files);        
        req.flash('message','saved successfully');
     }   
    res.redirect('/products/add_products');               
}
async function products_seo(req,res){
    if(await productModel.checkProId(req.params.id) != null){
        let proSeoId = await productModel.fetch_single_product_seo(req.params.id);
    res.render("seo_page",{product_id : req.params.id,message: req.flash('message'), errors: req.flash('error'), data : proSeoId});    
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}
async function products_seo_post(req,res){
    if(await productModel.checkProId(req.params.id) != null){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){                   
     }else{
        await productModel.create_product_seo(req.body, req.params.id);                      
        req.flash('message','saved successfully');
     }
     res.redirect('/products/seo/' + req.params.id);
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}

async function products_seo_update(req,res){
    if(await productModel.checkProId(req.params.id) != null){
    const errors = validationResult(req);        
     if(!errors.isEmpty()){                   
     }else{
        await productModel.update_product_seo(req.body, req.params.id);                      
        req.flash('message','updated successfully');
     }
     res.redirect('/products/seo/' + req.params.id);
    }else{
        res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
    }
}


module.exports = {
    products_table,
    addproducts_table,
    products_post,
    products_seo,
    products_seo_post,
    products_seo_update
}