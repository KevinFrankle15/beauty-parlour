const attendance = require("../attendanceprocess/attendanceModel");
module.exports = async (req , res , next) => {
   const Attendance = await attendance.find({});
   console.log("Attendance.length " + Attendance.length);
   if(Attendance.length == 0){
       res.send("<h1>Sorry! The Attendace not been taken Yet , Please wait for briefing and Thank you for visiting !!!</h1>")
    }else{
        next();
    }

}