const express = require("express");
const routers = require("express").Router();
//const verify = require("../login/verifyToken");
const path = require("path");
//const jwt = require("jsonwebtoken");
//const user = require("../login/usermodel");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/", async (req,res) => {
    //res.send(req.emailExist);
    //sendMail(req, res);
    
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/recoverVerify");
           
});




module.exports = routers;