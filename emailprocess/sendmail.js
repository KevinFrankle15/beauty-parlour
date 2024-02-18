const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
//collection of student details
const studentSchema = require("../attendanceprocess/studentModel");
//collection of parent details
const parent = require("../attendanceprocess/parentModel");
//details of mentors
//const mentor = require("../login/usermodel");
//collection of attendance



const sendMail = async (Abs , absSession) => {
    //send the mail each and every parents of an absentees
   
 Abs.map(async (abs) => {
        const  Student = await studentSchema.findOne({studentName: abs});
        const  Parent = await parent.findOne({_id: Student.parentId});
        //const  Mentor = await mentor.findOne({_id: Student.mentorId});
        //To create transporter
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
        to: Parent.parentEmail,   
        //email to a parents and mentors for absentees                          
        subject: 'for informing the Absentees',
            //to send a message to specific email
        text: "Dear Parent Your Children not attending the today's Session , and your child's class details given below \n\n" + "Student Name : " + Student.studentName + "\n" + "was absent in the period : " +  absSession +"\n"+ "student details are"  +"\n" + "RollNo : " + Student.studentRollNo + "\n" + "Department : " + Student.department + "\n" + "Class Section : " + Student.classSec + "\n" + "Current Year : " + Student.currentYear + "\n\n" + "this is the mail for informing the particular parents for taking care of their child " + "\n\n" + "Thank You"
     };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     
     //then send a email
     transporter.sendMail(mailOption, (err, info) => {
        if(err) console.log("error occur", err);
        else console.log("it works", info);
     });
 });
    
};

module.exports = sendMail;
