const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
//const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
const students = require("../attendanceprocess/studentModel");
//const { changepasswordvalidation } = require("../login/validation");
//const bcrypt = require("bcryptjs");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/",verify, async (req,res) => {
    //res.send(req.emailExist);
    
    //const emailExist = await user.findOne({_id: req.emailExist._id});
    
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/deleteAccount");
           
});
routers.post("/" ,verify, async (req , res) => {
    //console.log(req.emailExist);
    //const Email = req.body.email;
    const findUser = await user.findOne({_id: req.emailExist._id});
    //console.log(findUser);
    //if(!findUser) return res.status(400).send("email does not exist");
    const Students = await students.find({department:findUser.Department , classSec:findUser.classSec , classYear:findUser.classYear});
            
            Students.map(async (student) => {
                for( var i = 0; i < student.mentorId.length; i++){ 
                    var studenthave = new String(student.mentorId[i]);
                    var mentorhave = new String(req.emailExist._id);
                    //var we = new String(alsoString.trim());
                    var isEquel = JSON.stringify(studenthave) === JSON.stringify(mentorhave);
                    
                    var it = isEquel ? 1 : 0;
                    
                    //console.log(i);
                    console.log(student.mentorId[i] + "\n" + req.emailExist._id + "\n");
                    if (it) { 
                        student.mentorId.splice(i, 1);
                        console.log("done " + student.mentorId + "\n"); 
                    }
                }
                await students.updateOne({_id:student._id} , {mentorId: student.mentorId});
            });
    await user.deleteOne({_id: findUser._id});
    res.clearCookie("auth-token");
    res.status(200).redirect("/");

});

module.exports = routers;