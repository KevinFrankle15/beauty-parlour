const mongoose = require("mongoose");

//create schema

const userSchema = new mongoose.Schema(
    {
         name:{
             type: String,
             required:true,
             min: 6,
             max: 256
         },
         email:{
             type: String,
             required:true,
             min: 6,
             max: 256      
         },
         password:{
             type: String,
             required:true,
             min: 8,
             max: 1024
         },
         Department:{
            type: String,
            required:true,
        },
         classYear:{
            type: Number,
            required:true,
        },
         classSec:{
            type: String,
            required:true,
        },
         currentYear:{
            type: Number,
            required:true,
        },
         date:{
             type: Date,
             Default: Date.now()
         }

    },
    {collection: 'users'}
);



module.exports = mongoose.model('user' , userSchema);