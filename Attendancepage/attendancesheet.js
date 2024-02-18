const express = require("express");
const routers = require("express").Router();
const verify = require("../login/verifyToken");
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../login/usermodel");
const nullAttendanceVerify = require("./nullAttendanceverify");
const students = require("../attendanceprocess/studentModel");
const attendance = require("../attendanceprocess/attendanceModel");
const arrayDiff = require("../attendanceprocess/arraydiff");
//const sendMail = require("../emailprocess/sendmail");
//make private route for login user
//the page contains attendance details
//to include static pages
routers.use(express.static(path.join(__dirname + "/../views/static_pages")));
routers.use(express.urlencoded({extended:true}));
routers.use(express.json());
routers.get("/", verify, nullAttendanceVerify , async (req,res) => {
    //res.send(req.emailExist);
    //sendMail(req, res);
    const mentor = await user.findOne({_id: req.emailExist._id});
    const userName = mentor.name;
    const Students = await students.find({department: mentor.Department , classSec: mentor.classSec , classYear: mentor.classYear});
    const Attendance = await attendance.find({});
    
    //console.log(Students + "\n" + Attendance);
    let studentNameList = [];
    Students.map((student) => {
        studentNameList = [...studentNameList , student.studentName];
    });
     //console.log(studentNameList);
    //find the current  section present students
    var studentCurSecArr = [];
    console.log(studentCurSecArr.length);
    var studentCurSecObj = {};
    var stuAtt = {};
    var Attendance1 = [];
    var AttArray = [];
    var Attendance2 = [];
    Attendance.map((Session) => {
        AttArray = [...AttArray , Session.studentList];
        stuAtt = {...stuAtt , date: Session.date};
        Attendance2 = [...Attendance2 , stuAtt];
    }); 
    //console.log(AttArray);
    AttArray.map((studentlist) => {
        studentlist.map((Studentlist) => {
            //console.log(studentlist);
            for(var index = 0; index < studentNameList.length; index++){
                if(Studentlist == studentNameList[index]){
                    //console.log(Studentlist);
                    studentCurSecArr[studentCurSecArr.length] = Studentlist;
                    break;
                }
                //else console.log('-\n');
                

            }
            
            
        });
        //console.log(studentCurSecArr);
        studentCurSecObj = {...studentCurSecObj , studentList: studentCurSecArr};
        Attendance1 = [...Attendance1 , studentCurSecObj];
        studentCurSecArr = [];
        //console.log(studentCurSecArr);
    });
    
    //console.log("Attendance1",Attendance2);
    
    var absents = [];
    const Abs = arrayDiff(studentNameList,Attendance1[Attendance1.length-1].studentList);
    //console.log(Abs + "\n" + Attendance1.length);

    Attendance1.map((absence) => {
       absents = [...absents , arrayDiff(studentNameList,absence.studentList)];
       //console.log(absence.studentList + "\n");
    });
    
    //If token is successfully verified, we can send the autorized data 
    res.status(200).render("../views/static_pages/attendanceSheet" , 
    {
        name: userName , 
        StudentDetails: Students,
        studentNameList: studentNameList , 
        presentStudents: Attendance1[Attendance1.length-1].studentList , 
        DatenSession: Attendance[Attendance.length-1].date ,
        Absentees: Abs,
        Attendance: Attendance2,
        absents: absents
    });
           
});




module.exports = routers;