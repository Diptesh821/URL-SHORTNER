const express=require("express");
const router=express.Router(); 
router.get("/otp_verification",(req,res)=>{
    console.log("piku");
    if(req.cookies.token){
        return res.redirect("/");
    }
   if(!req.session.isUserVerified){
      return res.redirect("/login");
   }
req.session.isReset=false;;
    return res.render("otp_verification");
});

module.exports=router;
