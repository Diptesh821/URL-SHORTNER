const express=require("express"); 
const bcrypt=require("bcrypt");
const router=express.Router();
const URL=require("../models/url.js")
const USER=require("../models/user.js");
const {restrictTo}=require("../middlewares/auth.js")


router.post("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{
    
   const allUrls=await URL.find({});
   const {email,password,passkey}=req.body;
   const user=await USER.findOne({
    email
});
if(!user){
    return res.send(`<script>
        alert('You are not an admin');
        window.location.href='/admin' </script>`);
       
}
const ismatch=await bcrypt.compare(password,user.password);
if(!ismatch){
    return res.send(`<script>
        alert('Invalid email or password');
        window.location.href='/admin' </script>`);
       
}

 
if(passkey==user.passkey){
    req.session.isAdminVerified=true;
    req.session.allUrls=allUrls;
    req.session.createdBy=req.user;
    return res.redirect("/allusersinfo")}
    else{
        return res.send(`<script>
            alert('Invalid passkey or password');
            window.location.href='/admin' </script>`);
           
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
            createdBy:req.session.createdBy,
        })
    }
    else{
        res.render("normal_homepage",{
            id:req.session.shortid,
            createdBy:req.session.createdBy,
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
    req.session.isReset=false;
    req.session.isUserVerified=false;
    res.render("signup");
})
router.get("/login",  (req,res)=>{
    req.session.isReset=false;
    req.session.isUserVerified=false;
    res.render("login");
})




router.post("/logout",(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie("token");
    res.status(200).send({message:"logged out successfully"});

})


module.exports=router; 