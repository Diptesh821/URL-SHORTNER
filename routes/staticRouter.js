const express=require("express"); 
const router=express.Router();
const URL=require("../models/url")
const {restrictTo}=require("../middlewares/auth")

router.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{
    
    const allUsers=await URL.find({});
   
    return res.render("home",{

        urls:allUsers,
        createdBy:req.user,

    })
})



router.get("/",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    
    const allUsers=await URL.find({createdBy:req.user._id});
    console.log(req.user);
    console.log(allUsers);
  console.log(req.user.role);
    return res.render("home",{

        urls:allUsers,
        createdBy:req.user,
    })
})
router.get("/signup",(req,res)=>{
    res.render("signup");
})
router.get("/login",  (req,res)=>{
    res.render("login");
})
module.exports=router; 