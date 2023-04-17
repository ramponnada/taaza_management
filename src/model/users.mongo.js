const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    country:{
        type: String,        
    },
    street_address:{
        type: String        
    },
    city:{
        type: String        
    },
    zipCode:{
        type: Number,                
    },
    phone_number:{
        type: Number        
    },
    comment:{
        type: String        
    }
});
const orderdUsersSchema = new mongoose.Schema({
    first_name : {
        type: String,        
    },
    last_name:{
        type: String,        
    },
    email:{
        type: String,
        lowercase: true,
        trim:true        
    },
    password:{
        type: String
    },
    usertype:{
        type: Number
    },
    address:{
        type: AddressSchema,        
    }    
});
module.exports = mongoose.model("orderdUsers", orderdUsersSchema);