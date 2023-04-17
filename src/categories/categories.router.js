const express = require('express');
const categoryRouter = express.Router();
const { body , validationResults} = require("express-validator");
const categoryController = require('./categories.controller');
const {checkAuth} = require('../authentication');
const {validateSeo} = require('../products/validator');

categoryRouter.get('/', [checkAuth],categoryController.categoryTable);
categoryRouter.get('/add_category', [checkAuth],categoryController.add_category);
categoryRouter.post('/add_category', [checkAuth],[body('title').custom(value => {    
    if(value === ''){
        throw new Error('title field is required');
    }
    if(typeof(value) !== 'string'){
        throw new Error("number datatype is not allowed");
    }
    return true;

}).bail().trim().isLength('3').withMessage('title should be more than 3 characters'),body('status').isBoolean()
.withMessage('Must be a boolean true or false').notEmpty().withMessage('status field is required')],categoryController.category_post);
categoryRouter.get('/edit/:id', categoryController.category_edit);
categoryRouter.post('/edit/:id', [checkAuth],[body('title').trim().escape().notEmpty().withMessage('title field is required').custom(value => {
    if(typeof(value) !== 'string'){
        throw new Error("number datatype is not allowed");
    }
    return true;
}).bail().isLength('3').withMessage('title should be more than 3 characters'),body('status').isBoolean()
.withMessage('Must be a boolean true or false').notEmpty().withMessage('status field is required')],categoryController.category_update);
categoryRouter.get('/delete/:id', [checkAuth], categoryController.category_delete);
categoryRouter.get('/seo/:id', [checkAuth],categoryController.category_seo);
categoryRouter.post('/seo/:id', [checkAuth,validateSeo],categoryController.category_seo_post);
categoryRouter.post('/seo/edit/:id', [checkAuth,validateSeo],categoryController.category_seo_update);
module.exports = {
    categoryRouter
}





// .custom(value => {
//     const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//     let val = value.trim();
//     // if(val === ''){
//     //     throw new Error("title field is required");
//     // }
//     if(val.length < 4){
//         throw new Error("title should be more than 3 characters");
//     }
//     if(format.test(val)){
//         throw new Error("no special characters are allowed");
//     }
// })