const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
//collection of student details
const studentSchema = require("../attendanceprocess/studentModel");
//collection of parent details
//const parent = require("../attendanceprocess/parentModel");
//details of mentors
const mentor = require("../login/usermodel");
const ArrDiff = require("../attendanceprocess/arraydiff");
//collection of attendance


var StudentsAbs = [];
const sendMail = async (Abs , absSession) => {
    //send the mail each and every mentor of an absentees
    for(var i = 0; i < Abs.length; i++){
        const student = await studentSchema.findOne({studentName: Abs[i]});   
        StudentsAbs =  [...StudentsAbs , student];
           //return student;
    }
    
    StudentsAbs.sort();
    
    //console.log(StudentsAbs);
    var uniqueStu = [];
    var temp1 = 0;
    //uniqueStu[uniqueStu.length] = [...uniqueStu , { classSec: StudentsAbs[0].classSec , studentName: StudentsAbs[0].studentName}];
    for(var i = 0; i < StudentsAbs.length; i++){
        for(var j = i , k = 1; j < StudentsAbs.length; j++){
            if(StudentsAbs[i].classSec != StudentsAbs[j].classSec){
                temp1 = j;
                uniqueStu = [...uniqueStu , StudentsAbs.splice(i , temp1)];
                i = temp1;
            }
        }
    }
    uniqueStu = [...uniqueStu , StudentsAbs];
    console.log(uniqueStu);
    // console.log(StudentsAbs);
    uniqueStu.map(async (ment) => {
        var mentorIds = [];
        var studentAbsenceList = [];
        mentorIds = ment[0].mentorId;
        ment.map((AbsenceName) => {
            studentAbsenceList = [...studentAbsenceList ,AbsenceName.studentName + "( " + AbsenceName.studentRollNo + " )"];
        });
        mentorIds.map(async (mentordetails) => {
            const Mentor = await mentor.findOne({_id: mentordetails});
            let transporter = nodemailer.createTransport(smtpTransport(
                {
                    service: 'gmail',
                    auth: { 
                        user:process.env.EMAIL,
                        pass:process.env.EMAIL_PASSWORD,
                     }
                }
             ));
             
             //To create mail option
             let mailOption = {
                from: process.env.EMAIL,
                to: Mentor.email,   
                //email to a parents and mentors for absentees                          
                subject: 'for informing the Absentees',
                    //to send a message to specific email
                text: "Student List : " + "\n\n" + studentAbsenceList + "\n\n" + "were absent in the period : " +  absSession +"\n\n"+ "student details are"  +"\n" + "Department : " + ment[0].department + "\n" + "Class Section : " + ment[0].classSec + "\n" + "Current Year : " + ment[0].currentYear + "\n\n" + "this is the mail for informing the particular  mentor Mr." + Mentor.name +" for taking care of their Students " + "\n\n" + "Thank You"
             };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
             
             //then send a email
             transporter.sendMail(mailOption, (err, info) => {
                if(err) console.log("error occur", err);
                else console.log("it works", info);
             });
        });

    });
   
};

module.exports = sendMail;
