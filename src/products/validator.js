const {body , checkSchema, validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const category = require('../model/category.mongo');

exports.validateProduct = [
    body('title').trim().escape().notEmpty().bail().isLength({ min: 4}).withMessage('title should be more than 4+ characters'),
    body('category_id').notEmpty()
    .custom(value => {
        return category.findOne({_id : value}).then(category => {
            if(!category){
                return Promise.reject('invalid catgory');
            }
        })
    })
    .withMessage('invalid catgory'),
    body('price').trim().escape().notEmpty().bail().isDecimal().withMessage("only decimals are allowed"),
    body('stq').trim().escape().notEmpty().bail().isInt().withMessage("only integer is allowed"),
    body('price2').trim().escape().notEmpty().bail().isDecimal().withMessage("only decimals are allowed"),
    body('stq2').trim().escape().notEmpty().bail().isInt().withMessage("only integer is allowed"),
    body('description').trim().escape().notEmpty(),
    body('status').notEmpty().withMessage('status field is required').bail().isBoolean().withMessage("only boolean value required"),
    checkSchema({
        'img': {
            custom: {
                options: (value, { req, path }) => {
                    if(req.files.length >= 1){
                        return true;                        
                    }
                    if(req.files.length >= 4){
                        return false;
                    }
                    if(req.files.mimetype === 'image/jpeg'){
                        return '.jpeg'; // return "non-falsy" value to indicate valid data"
                    }else{
                        return false; // return "falsy" value to indicate invalid data
                    }
                    },
                errorMessage: 'You should upload a jpeg file up to 10Mb',
            }
        }       
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            req.flash('error', errors.array());
            const filesLength = req.files.length;
            if(filesLength > 0 ){
                console.log(req.files);                              
                for(let i = 0 ; i < filesLength; i++){                                    
                    fs.unlinkSync(req.files[i].path , (err) => {
                        if (err) {
                            console.log(err);
                        }
                        //console.log(`successfully deleted ${req.files.path}`);
                    });
                }
            }
        }        
        next();        
      },
];

exports.validateSeo = [
    body('meta_title').trim().escape().notEmpty(),
    body('meta_keywords').trim().escape().notEmpty(),
    body('meta_description').trim().escape().notEmpty(),
    body('footer_title').trim().escape().notEmpty(),
    body('footer_description').trim().escape().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
        req.flash('error', errors.array());
        }
        next();
    }    
];