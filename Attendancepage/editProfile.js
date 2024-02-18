const express = require("express");
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
const { editprofilevalidation , editprofilevalidationName , editprofilevalidationEmail } = require("../login/validation");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.get("/",verify, async (req,res) => {
    //res.send(req.emailExist);
    //sendMail(req, res);
    const mentor = await user.findOne({_id: req.emailExist._id});
    const userName = mentor.name;
    const email = mentor.email;
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/editProfile" , {name: userName, email: email, editProfilemessage: req.session.editProfileerror});
           
});

//update user details to server 
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.post("/",verify, async (req,res) => {

     //getting the inputs from the user
     var userName = req.body.name;
     var userEmail = req.body.email;
     //var password = req.body.password;
     console.log(userName + "\n" + userEmail );
     
     
  
    //update the information to the current user
    if(userName != "" && userEmail != ""){
        //check if  the given information are valid
     const { error } = editprofilevalidation(req.body);
     console.log(req.body);
     if (error){
        req.session.editProfileerror = error.details[0].message;
        console.log(req.session.editProfileerror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
     }
     req.session.editProfileerror = undefined;
        await user.updateOne({}, {name: userName ,email: userEmail });
        try{
            const savedUser = await user.findOne({email: userEmail});
            res.redirect("/user/profile");
            console.log("it works" + " " + savedUser);
        }catch(err){
          //res.status(404).send(err);
          console.log("not work" + err);
        }
    }
    
    else if(userName == "" && userEmail != ""){
        //check if  the given information are valid
     const { error } = editprofilevalidationEmail(req.query.email);
     console.log(req.query.email);
     if (error){
        req.session.editProfileerror = error.details[0].message;
        console.log(req.session.editProfileerror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
     }
     req.session.editProfileerror = undefined;
        await user.updateOne({}, {email: userEmail});
        try{
            const savedUser = await user.findOne({email: userEmail});
            res.redirect("/user/profile");
            console.log("it works" + " " + savedUser);
        }catch(err){
          //res.status(404).send(err);
          console.log("not work" + err);
        }
    }
    
    else if(userName != "" && userEmail == ""){
            //check if  the given information are valid
     const { error } = editprofilevalidationName(req.query.name);
     console.log(req.query.name);
     if (error){
        req.session.editProfileerror = error.details[0].message;
        console.log(req.session.editProfileerror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
     }
     req.session.editProfileerror = undefined;
        await user.updateOne({}, {name: userName});
        try{
            const savedUser = await user.findOne({name: userName});
            res.redirect("/user/profile");
            console.log("it works" + " " + savedUser);
        }catch(err){
            //res.status(404).send(err);
            console.log("not work" + err);
    }
    }
    else{
        req.session.editProfileerror = "To update credentials you have to enter values";
        console.log(req.session.editProfileerror);
        //req.flash('message', error.details[0].message);
        //console.log(req.flash('message'));
        return res.redirect("back");
    }
    
    

});




module.exports = routers;