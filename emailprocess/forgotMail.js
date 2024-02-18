const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const mentor = require("../login/usermodel");
//collection of attendance



const sendMail = async (user) => {
    //send the mail to recover passwor
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
        to: user,   
        //email to a mentors To Recover Password                          
        subject: 'To Recover Password',
            //to send a message to specific email
        text: "reset password link" + "\n\n" + "https://auto-attendance-16.herokuapp.com/user/recoverPassword"
     };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     
     //then send a email
     transporter.sendMail(mailOption, (err, info) => {
        if(err) console.log("error occur", err);
        else console.log("it works", info);
     });
 
    
};

module.exports = sendMail;
