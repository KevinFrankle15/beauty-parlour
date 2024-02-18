const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//const session = require("express-session");
const routers = require("express").Router();
const User = require("../login/usermodel");
const { forgotPasswordvalidation } = require("../login/validation");
const path = require("path");
const sendMail = require("../emailprocess/forgotMail");
//app.use(session({resave: true, saveUninitialized: true, secret: process.env.TOKEN_SECRET, cookie: { maxAge: 60000 }}));

//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));

routers.get("/" , (req, res) => {
    res.status(200).render("../views/static_pages/forgotPassword" , {forgotPasswordmessage: req.session.forgotPassworderror});

});

//user login
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.post("/" , async (req,res) => {
   
   //getting the inputs from the user
    var userEmail = req.body.email;
    //var password = req.body.password;
    req.session.email = userEmail;

    console.log(req.session.email);
   
    //check if  the given information are valid
   const { error } = forgotPasswordvalidation(req.body);
   //console.log(req.body);
   if (error){
    req.session.forgotPassworderror = error.details[0].message;
    console.log(req.session.forgotPassworderror);
    //req.flash('message', error.details[0].message);
    //console.log(req.flash('message'));
    return res.redirect("back");
   }
   
   
   // check if the email is already exist on the database
   const emailExist = await User.findOne({email: userEmail});
   if (!emailExist){ 
    req.session.forgotPassworderror = "email does not exist";
    console.log(req.session.forgotPassworderror);
    //req.flash('message', error.details[0].message);
    //console.log(req.flash('message'));
    return res.redirect("back");
    
   }
  
  sendMail(userEmail);
  
  
  
    //req.session.email = 'userEmail';
    //console.log(req.session.email);
    req.session.forgotPassworderror = undefined;
  //console.log(req.cookies);
  res.redirect("/user/recoverVerify");
    
   

});


module.exports = routers;
