//collection of student details
const studentSchema = require("./studentModel");
//find the absenteess so
const AbsenteesArray = require("./arraydiff");
//for mailing
const sendMail = require("../emailprocess/sendmail");
const mentorMail = require("../emailprocess/mentormail");

//method to find absentees

const absentees = async (studentList , absSession) => {
    const  Student = await studentSchema.find({});
    let studentNameList = [];
    Student.map((student) => {
        studentNameList = [...studentNameList , student.studentName];
    });
    //find out the absentees list
    const abs = AbsenteesArray(studentNameList, studentList);
    //to send the mail to officials for absentees
    sendMail(abs , absSession);
    mentorMail(abs , absSession);
    //console.log(abs);
};

module.exports = absentees;