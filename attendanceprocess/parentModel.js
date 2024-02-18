const mongoose = require("mongoose");

//create schema

const parentSchema = new mongoose.Schema(
    {
         parentName:{
             type: String,
             required:true,
             min: 6,
             max: 256
         },
         parentEmail:{
             type: String,
             required:true,
             min: 6,
             max: 256      
         },
         studentId:{
             type: String,
             required:true
         }

    },
    {collection: 'parent details'}
);



module.exports = mongoose.model('parent' , parentSchema);