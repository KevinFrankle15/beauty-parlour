const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const session = require('express-session');
//const flash = require('connect-flash');
//app.set('trust proxy', 1)
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { httpOnly: true, secure: false, maxAge: 180000 }
	})
);
//app.use(flash());
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const ejs = require('ejs');
//to find student details
const student = require('../attendanceprocess/putattendance');
//const server = require("./views/server");
// set the view engine to ejs
app.set('view engine', 'ejs');
//to import file to getting user details
const classDetails = require('../login/classDetails');
const signUp = require('../login/signup');
//to login the user
const login = require('../login/login');
//to view user profile
const profile = require('../Attendancepage/profile');
//to edit user profile
const editProfile = require('../Attendancepage/editProfile');
//to change password
const changePassword = require('../Attendancepage/changePassword');
//to delete account
const deleteAccount = require('../Attendancepage/deleteAccount');
//to forgot password
const forgotPassword = require('../Attendancepage/forgotPassword');
//recover password
const recoverPassword = require('../Attendancepage/recoverPassword');
//recover verify
const recoverVerify = require('../Attendancepage/recoverVerify');
//to make a private route for attendance sheet
const attendance = require('../Attendancepage/attendancesheet');
//to change attendance
const changeAttendance = require('../Attendancepage/changeAttendance');
const path = require('path');

//connect to mongodb
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECT, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('MongoDB Conected');
	} catch (err) {
		console.error(err.message);
	}
};
connectDB();

//to include static pages
app.use(express.static(path.join(__dirname + '/static_pages')));

app.get('/', (req, res) => {
	res.status(200).render('static_pages/landingpage');
	//console.log(req.session);
	//console.log(req.sessionID);
});

//Middleware
app.use(express.json());
//use middleware for login
app.use('/user/login', login);
//use middleware for signup
app.use('/user/classDetails', classDetails);
app.use('/user/signup', signUp);
//use middleware for attendance sheet
app.use('/studentattendance', attendance);
//to get user profile
app.use('/user/profile', profile);
//to get edit Profile
app.use('/user/editProfile', editProfile);
//to get change password
app.use('/user/changePassword', changePassword);
//to get delete account
app.use('/user/deleteAccount', deleteAccount);
//toget forgot password
app.use('/user/forgotPassword', forgotPassword);
//to get recover password
app.use('/user/recoverPassword', recoverPassword);
//to get recover verify
app.use('/user/recoverVerify', recoverVerify);
//to get changeAttendance
app.use('/changeAttendance', changeAttendance);

//put attendance and send mail for absentees per time to time (in every hour)
// var now = new Date();
// var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0) - now;
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
// }
// setTimeout(student , millisTill10);
// student();

//to allocate port
app.listen(process.env.PORT || 3000, () => console.log('server listening'));
