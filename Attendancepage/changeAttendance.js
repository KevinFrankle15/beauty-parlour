const express = require("express");
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const Student = require("../attendanceprocess/studentModel");
const { changepasswordvalidation } = require("../login/validation");
const bcrypt = require("bcryptjs");
const attendance = require("../attendanceprocess/attendanceModel");
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
    
   // const emailExist = await user.findOne({_id: req.emailExist._id});
    
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/changeAttendance" , {changeAttendancemessage: req.session.changeAttendanceerror});
           
});

routers.post("/",verify, async (req,res) => {
    var StuR_no = req.body.StuR_no;
    var present = req.body.present;
    const mentor = await user.findOne({_id: req.emailExist._id});
    var students = await Student.findOne({studentRollNo:StuR_no.toUpperCase() , department: mentor.Department , classSec: mentor.classSec , classYear: mentor.classYear});
    console.log(students);
    if(!students) {
        var students = await Student.findOne({studentName:StuR_no , department: mentor.Department , classSec: mentor.classSec , classYear: mentor.classYear});
        console.log(students);
    }
    if(!students){
        req.session.changeAttendanceerror = "Student name or Roll no dosn't exist in Sec - " + mentor.classSec;
        return res.redirect("back");
    }
    const Attendance = await attendance.find({});

    
        if(( students.studentRollNo == StuR_no.toUpperCase() || students.studentName == StuR_no ) && ( present == "" || present == "latest")){
            var flg = 0;
            for(var i = 0; i < Attendance[Attendance.length-1].studentList.length ; i++){
                if(Attendance[Attendance.length-1].studentList[i] == students.studentName){
                    var flg = 0;
                    break;
                }
                else{
                    var flg = 1;
                }
            }
            if(flg == 1){
                Attendance[Attendance.length-1].studentList[Attendance[Attendance.length-1].studentList.length] = students.studentName;
                console.log(Attendance[Attendance.length-1].studentList);
                await attendance.updateOne({date:Attendance[Attendance.length-1].date} , {studentList: Attendance[Attendance.length-1].studentList});
                req.session.changeAttendanceerror = undefined;
                return res.redirect("/studentattendance");

            }
            else{
                req.session.changeAttendanceerror = "you entered the name of the student was already present";
                return res.redirect("back");
            }
        }
        else if( students.studentRollNo == StuR_no.toUpperCase() || students.studentName == StuR_no ){
            var flg = 0;
            for(var i = 0; i < Attendance[parseInt(present) - 1].studentList.length ; i++){
                if(Attendance[parseInt(present) - 1].studentList[i] == students.studentName){
                    var flg = 0;
                    break;
                }
                else{
                    var flg = 1;
                }
            }
            if(flg == 1){
                Attendance[parseInt(present) - 1].studentList[Attendance[parseInt(present) - 1].studentList.length] = students.studentName;
                console.log(Attendance[parseInt(present) - 1].studentList);
                await attendance.updateOne({date:Attendance[parseInt(present) - 1].date} , {studentList: Attendance[parseInt(present) - 1].studentList});
                req.session.changeAttendanceerror = undefined;
                return res.redirect("/studentattendance");

            }
            else{
                req.session.changeAttendanceerror = "you entered the name of the student was already present";
                return res.redirect("back");
            }
        }
    
    
});

module.exports = routers;