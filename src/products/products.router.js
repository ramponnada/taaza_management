const express = require('express');
const productRouter = express.Router();
const {body} = require('express-validator');
const path = require('path');
//const { diskStorage } = require('multer');
const multer  = require('multer');
const productController = require("./products.controller");
const {validateProduct, validateSeo} = require('./validator');
const {checkAuth} = require('../authentication');

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'src/public/uploads/');    
    }, 
    filename: function (req, file, cb) { 
       cb(null ,  'taaza-main' + Date.now() + '.jpeg');   
    }
 });
 const upload = multer({ 
    storage: storage,
    limits: {
        //fields: 5,
        fieldNameSize: 50, // TODO: Check if this size is enough
        fieldSize: 20000, //TODO: Check if this size is enough
        // TODO: Change this line after compression
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    },    
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
})

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      //cb('Error: Images Only!');      
      return cb(null,false);
    }
  }

productRouter.get('/', [checkAuth],productController.products_table);
productRouter.get('/add_products', [checkAuth],productController.addproducts_table);
productRouter.post('/add_products',[checkAuth,upload.array('img', 4), validateProduct], productController.products_post);
productRouter.get('/seo/:id', [checkAuth],productController.products_seo);
productRouter.post('/seo/:id',[checkAuth,validateSeo] ,productController.products_seo_post);
productRouter.post('/seo/edit/:id',[checkAuth,validateSeo] ,productController.products_seo_update);

module.exports= {
    productRouter
}