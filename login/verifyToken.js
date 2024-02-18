const jwt = require("jsonwebtoken");
const Token = require("../login/stringTrim");
//check the token is created from login user
const auth = (req,res,next) => {
    //console.log(req.headers.cookie);
    var hedToken = req.headers.cookie != undefined ? req.headers.cookie.split(';') : "wrong token key";
   const token = Token(hedToken);
   //console.log(Token(req.headers.cookie.split(';')));                                                                                                                                                                                                        
   //console.log(req.headers.cookie === hedToken);

   if(!token) return res.redirect("/user/login" );
   try{
       const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       req.emailExist = verified;
       req.token = token;
       next();
   }catch(err){
       console.log(err);
       res.status(400).send("<h1>Invalid Token and you are unauthorized to view this page</h1>");
   }
};






module.exports = auth;