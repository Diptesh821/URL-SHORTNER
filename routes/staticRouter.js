const express=require("express"); 
const router=express.Router();
const URL=require("../models/url")
const USER=require("../models/user.js");
const {restrictTo}=require("../middlewares/auth")

router.post("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{
    
    const allUrls=await URL.find({});
   const {email,password,passkey}=req.body;
   const user=await USER.findOne({
    email,
    password
});


if(!user){
    
    return res.render("not_admin"); 
}
if(passkey==user.passkey){
    return res.render("allusers_info",{

        urls:allUrls,
        createdBy:req.user,

    })}
    else{
        res.render("invalid_passkey");
    }
})

router.get("/admin",restrictTo(["ADMIN"]),async(req,res)=>{
    
   
    const allUrls=await URL.find({});
    return res.render("admin_verify",{

        urls:allUrls,
        createdBy:req.user,

    })
})



router.get("/",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    
    const allUrls=await URL.find({createdBy:req.user._id});
    console.log(req.user);
    console.log(allUrls);
  console.log(req.user.role);
  if(req.user.role=="NORMAL"){
    return res.render("normal_homepage",{

        urls:allUrls,
        createdBy:req.user,
    })}
    else{
        return res.render("admin_homepage",{

            urls:allUrls,
            createdBy:req.user,
        })

    }
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})
router.get("/login",  (req,res)=>{
    res.render("login");
})
router.post("/logout",(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie("token");
    res.status(200).send({message:"logged out successfully"});

})
module.exports=router; 