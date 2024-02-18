const express = require('express');
const app = express();
//const cookieParser = require("cookie-parser");
//app.use(cookieParser());
const routers = require('express').Router();
const User = require('./usermodel');
const { loginvalidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

//to include static pages
routers.use(express.static(path.join(__dirname + '/../views/static_pages')));

routers.get('/', (req, res) => {
	res.status(200).render('../views/static_pages/Loginpage', { loginmessage: req.session.loginerror });
	//req.session.loginerror = undefined;
});

//user login
routers.use(express.urlencoded({ extended: true }));
routers.use(express.json());
routers.post('/', async (req, res) => {
	//getting the inputs from the user
	var userEmail = req.body.email;
	var password = req.body.password;
	//console.log(userEmail +   "\n" + password);

	//check if  the given information are valid
	const { error } = loginvalidation(req.body);
	//console.log(req.body);
	if (error) {
		req.session.loginerror = error.details[0].message;
		console.log(req.session.loginerror);
		//req.flash('message', error.details[0].message);
		//console.log(req.flash('message'));
		return res.redirect('back');
	}

	// check if the email is already exist on the database
	const emailExist = await User.findOne({ email: userEmail });
	if (!emailExist) {
		req.session.loginerror = 'email does not exist';
		console.log(req.session.loginerror);
		//req.flash('message', error.details[0].message);
		//console.log(req.flash('message'));
		return res.redirect('back');
	}

	// check if the password is correct
	const passwordExist = await bcrypt.compare(password, emailExist.password);
	if (!passwordExist) {
		req.session.loginerror = 'password is invalid';
		console.log(req.session.loginerror);
		//req.flash('message', error.details[0].message);
		//console.log(req.flash('message'));
		return res.redirect('back');
	}

	//create and assign a token
	const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);

	req.session.loginerror = undefined;
	console.log(req.session.loginerror);
	//res.cookie('tokenKey', token);
	//console.log(token);
	res.cookie('auth-token', token, { maxAge: 86400000, httpOnly: true });
	//console.log(req.headers["auth-token"] + "\n" + token);
	//console.log(JSON.stringify(req.cookies));
	//console.log(JSON.stringify(req.headers['auth-token']));
	//console.log(req.header.signedCookie);
	//console.log(req.signedCookies);
	//console.log(req.cookies.auth-token);
	//console.log(1000 * 60 * 60 * 24);86400000
	res.redirect('/studentattendance/');
});

module.exports = routers;
