const express = require('express');
const routers = require('express').Router();
const User = require('./usermodel');
const { classDetailsvalidation } = require('./validation');
const bcrypt = require('bcryptjs');
const path = require('path');
const students = require('../attendanceprocess/studentModel');

//to include static pages
routers.use(express.static(path.join(__dirname + '/../views/static_pages')));

routers.get('/', (req, res) => {
	res
		.status(200)
		.render('../views/static_pages/classDetails', { classDetailsmessage: req.session.classDetailserror });
});

//upload user details to server
routers.use(express.urlencoded({ extended: true }));
routers.use(express.json());
routers.post('/', async (req, res) => {
	//getting the inputs from the user
	var Department = req.body.Department.toUpperCase();
	var classYear = parseInt(req.body.classYear) || 0;
	var classSec = req.body.classSec.toUpperCase();
	var currentYear = parseInt(req.body.currentYear) || 0;
	console.log(Department + '\n' + classYear + '\n' + classSec + '\n' + currentYear);

	//check if  the given information are valid
	const { error } = classDetailsvalidation(req.body);
	console.log(req.body);
	if (error) {
		req.session.classDetailserror = error.details[0].message;
		console.log(req.session.classDetailserror);
		//req.flash('message', error.details[0].message);
		//console.log(req.flash('message'));
		return res.redirect('back');
	}

	// check if the class is already exist on the database
	const classExist = await students.findOne({ department: Department, classSec: classSec, classYear: classYear });
	if (!classExist) {
		req.session.classDetailserror = "entered class doesn't exist";
		console.log(req.session.classDetailserror);
		//req.flash('message', error.details[0].message);
		//console.log(req.flash('message'));
		return res.redirect('back');
	}
	req.session.classDetailserror = undefined;
	req.session.department = Department;
	req.session.classYear = classYear;
	req.session.classSec = classSec;
	req.session.currentYear = currentYear;
	res.redirect('/user/signup');
});

module.exports = routers;
