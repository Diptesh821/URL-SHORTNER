const express=require("express"); 
const router=express.Router();
const URL=require("../models/url.js")
const USER=require("../models/user.js");
const {restrictTo}=require("../middlewares/auth.js")

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
    req.session.isAdminVerified=true;
    req.session.allUrls=allUrls;
    req.session.createdBy=req.user;
    return res.redirect("/allusersinfo")}
    else{
        res.render("invalid_passkey");
    }
})

router.get("/admin",restrictTo(["ADMIN"]),async(req,res)=>{
    
   
    const allUrls=await URL.find({});
    return res.render("admin_verify")
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
router.get("/dashboard",restrictTo(["NORMAL","ADMIN"]),(req,res)=>{
    if(req.user.role=='ADMIN'){
        res.render("admin_homepage",{
            id:req.session.shortid,
        })
    }
    else{
        res.render("normal_homepage",{
            id:req.session.shortid,
        })
    }

})
router.get("/allusersinfo",restrictTo(["ADMIN"]),(req,res)=>{
    if(!req.session.isAdminVerified){
        return res.redirect("/admin");
    }
    req.session.isAdminVerified=false; 
    res.render("allusers_info",{
        urls:req.session.allUrls,
        createdBy:req.session.createdBy
    })
   
    
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