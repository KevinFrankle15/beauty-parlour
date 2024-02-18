module.exports = (req , res , next) => {
    if(req.session.email != undefined){
        next();
    }
    else{
        return res.status(401).send("<h1>Link expired or You are not in the same device or browser</h1>");
      }
}