const {getUser}=require("../servers/auth.js")
function checkForAuthentication(req,res,next){
    const tokenCOOKIE= req.cookies?.token; 
    req.user=null;

    if(!tokenCOOKIE)
    return next();

    const token =tokenCOOKIE;
    const user=getUser(token);
    req.user=user;
    return next(); 

}
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("unauthorized");

        return next();
    }
}
module.exports={
  checkForAuthentication,
 restrictTo
}