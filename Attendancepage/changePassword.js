const express = require("express");
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
const { changepasswordvalidation } = require("../login/validation");
const bcrypt = require("bcryptjs");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/",verify, async (req,res) => {
    //res.send(req.emailExist);
    
    const emailExist = await user.findOne({_id: req.emailExist._id});
    
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/changePassword" , {changePasswordmessage: req.session.changePassworderror});
    console.log(req.session.changePassworderror);
    //console.log(req.flash('message'));      
});

routers.post("/",verify, async (req,res) => {
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;
    var confirmPassword = req.body.confirmPassword;
   
    
    //check if  the given information are valid
    const { error } = changepasswordvalidation(req.body);
    console.log(req.body);
    if (error){
        req.session.changePassworderror = error.details[0].message;
        console.log(req.session.changePassworderror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
    } 
    
 
   
    const emailExist = await user.findOne({_id: req.emailExist._id});

    //hash the password
    const salt = await bcrypt.genSalt(10);
    // check if the password is correct
   const passwordExist = await bcrypt.compare(currentPassword, emailExist.password);
   if(!passwordExist){
    req.session.changePassworderror = "current password is invalid";
    //req.flash('message', "current password is invalid");
    //console.log(req.flash('message'));
    return res.redirect("back");
   }  

   const newpass = await bcrypt.hash(newPassword, salt);
   const passwordExist1 = await bcrypt.compare(confirmPassword, newpass);
   if(!passwordExist1){
    req.session.changePassworderror = "new and confirm passwords are not matched";
    //req.flash('message', "new and confirm passwords are not matched");
    //console.log(req.flash('message'));
    return res.redirect("back");
   }

   req.session.changePassworderror = undefined;
   await user.updateOne({_id: req.emailExist._id}, {password: newpass});  
   try{
           const savedUser = await user.findOne({password: newpass});
       res.redirect("/user/profile");
       console.log("it works" + " " + savedUser);
   }catch(err){
      //res.status(404).send(err);
      console.log("not work" + err);
   }
});

module.exports = routers;