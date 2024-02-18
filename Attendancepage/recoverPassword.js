const express = require("express");
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
const { recoverpasswordvalidation } = require("../login/validation");
const bcrypt = require("bcryptjs");
const mailVerify = require("./mailVerify");
//const recoverVerify = require("./recoverVerify");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/", mailVerify, async (req,res) => {
    //res.send(req.emailExist);
    
    //const emailExist = await user.findOne({_id: req.emailExist._id});
    
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/recoverPassword" , {recoverPasswordmessage: req.session.recoverPassworderror});
           
});

routers.post("/",  mailVerify, async (req,res) => {
    console.log(req.session.email); 
   
           //var userEmail =  req.body.email;
        var newPassword = req.body.newPassword;
        var confirmPassword = req.body.confirmPassword;
        console.log(req.session.email);
    
        //check if  the given information are valid
        const { error } = recoverpasswordvalidation(req.body);
        console.log(req.body);
        if (error){
            req.session.recoverPassworderror = error.details[0].message;
            console.log(req.session.recoverPassworderror);
            //req.flash('message', error.details[0].message);
            //console.log(req.flash('message'));
            return res.redirect("back");
        }
    
 
   
   

        //hash the password
        const salt = await bcrypt.genSalt(10);

       const newpass = await bcrypt.hash(newPassword, salt);
       const passwordExist1 = await bcrypt.compare(confirmPassword, newpass);
       if(!passwordExist1){
        req.session.recoverPassworderror = "new and confirm passwords are not matched";
        console.log(req.session.recoverPassworderror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
       }
       req.session.recoverPassworderror = undefined;
       //const userEmail = recoverVerify();
        await user.updateOne({email: req.session.email}, {password: newpass});  
        try{
                const savedUser = await user.findOne({password: newpass});
            res.redirect("/user/login");
            console.log("it works" + " " + savedUser);
        }catch(err){
           //res.status(404).send(err);
           console.log("not work" + err);
        }
   
   
  
});

module.exports = routers;