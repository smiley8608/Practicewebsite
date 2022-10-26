

import mongoose =require('mongoose')

const tokenschema= new mongoose.Schema({
    email:{
        type:String,
        require:true,
       
    },
    token:{
        type:String,
        require:true,
    },
    expiredate:{
        type:Date,
        default:Date.now(),
        
    }
})

export const TokenModel = mongoose.model('token',tokenschema)