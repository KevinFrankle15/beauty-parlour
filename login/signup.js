const express = require("express");
const routers = require("express").Router();
const User = require("./usermodel");
const { registervalidation } = require("./validation");
const bcrypt = require("bcryptjs");
const path = require("path");
const students = require("../attendanceprocess/studentModel");



//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));

routers.get("/" , (req, res) => {
   
    res.status(200).render("../views/static_pages/SignUp" , {signupmessage: req.session.signuperror});
    
});


//upload user details to server 
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.post("/", async (req,res) => {

     //getting the inputs from the user
     var userName = req.body.name;
     var userEmail = req.body.email;
     var password = req.body.password;
     console.log(userName + "\n" + userEmail +   "\n" + password);
     
     //check if  the given information are valid
     const { error } = registervalidation(req.body);
     console.log(req.body);
     if (error){
        req.session.signuperror = error.details[0].message;
        console.log(req.session.signuperror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
       }
     
     
     // check if the email is already exist on the database
     const emailExist = await User.findOne({email: userEmail});
     if (emailExist){
        req.session.signuperror = "email is already exist";
        console.log(req.session.signuperror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
       } 

     //hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
  
     req.session.signuperror = undefined;
     //store the information to mongodb 
    const user = new User({
        name:userName,
        email:userEmail,
        password:hashedPassword,
        Department:req.session.department,
        classYear:req.session.classYear,
        classSec:req.session.classSec,
        currentYear:req.session.currentYear,
        date:Date.now()
    });   
    try{
            const savedUser = await user.save();
            const Students = await students.find({department:req.session.department , classSec:req.session.classSec , classYear:req.session.classYear});
            
            Students.map(async (student) => {
                student.mentorId[student.mentorId.length] = savedUser._id;
                await students.updateOne({_id:student._id} , {mentorId: student.mentorId});
            });

        res.redirect("/user/login");
        console.log("it works" + " " + savedUser);
    }catch(err){
       //res.status(404).send(err);
       console.log("not work" + err);
    }
});




module.exports = routers;