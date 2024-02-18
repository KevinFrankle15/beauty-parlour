const express = require("express");
const app = express();
//const cookieParser = require("cookie-parser");
//app.use(cookieParser());
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/",verify, async (req,res) => {
    //res.send(req.emailExist);
    //sendMail(req, res);
    const mentor = await user.findOne({_id: req.emailExist._id});
    const userName = mentor.name;
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/profile" , {name: userName});
           
});

routers.post("/" ,verify, async (req , res) => {
    
    res.clearCookie("auth-token");
    res.status(200).redirect("/");
});




module.exports = routers;