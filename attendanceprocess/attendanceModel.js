const mongoose = require("mongoose");

//create schema

const attendanceSchema = new mongoose.Schema(
    {
         present:{
             type: Boolean,
             required:true,     
         },
         studentList:{
             type: Array,
             required:true
         },
         date:{
            type: Date,
            Default: Date.now(),
            required:true
        },
    },
    {collection: 'attendance'}
);



module.exports = mongoose.model('attendance' , attendanceSchema);