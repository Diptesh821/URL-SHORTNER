const express=require("express");
const router=express.Router(); 
const USER=require("../models/user.js");
const {restrictTo}=require("../middlewares/auth.js")
const {transporter}=require("../nodemailer/transporter.js")


router.get("/forgot-password",(req,res)=>{
    req.session.isUserVerified=false;
    req.session.isReset=false;
   return res.render("forgot-password");
})
router.post("/forgot",async(req,res)=>{
    const {email}=req.body;
    const user=await USER.findOne({email});
    if(!user){
        return res.send(
            `<script>
            alert("User Not Found. Please Signup");
            window.location.href="/signup";
            </script>`

        );
    }
    const otp=Math.floor(100000+(Math.random()*900000)).toString();
    const expiresAt=Date.now()+5*60*1000;
    await USER.updateOne({email:email},{$set:{otp:otp,expiresAt:expiresAt}});
    
    req.session.purpose="reset password";
    req.session.isUserVerified=true;
    const mailOptions={
        from:'"Diptesh Singh" <pikudipteshsingh@gmail.com>',
        to:email,
        subject:"OTP for password reset",
        text:`Your OTP for password reset is ${otp}`,
        html:`Your OTP is ${otp}`,
    }  
   await transporter.sendMail(mailOptions,(error)=>{
        if(error){
            return res.send(
                `<script>
                alert("Unable to send email.");
                window.location.href="/login";
                </script>`
            )
        }
        console.log("Email message send successfully",info.messageId);

    })
    return res.redirect("/otp_verification");


})

router.get("/reset-password",(req,res)=>{
    if(req.cookies.token){
        return res.redirect("/");
    }
    if((!req.session.purpose)||(!req.session.isReset)){
        return res.redirect("/login");
    }
   
    return res.render("reset_password",{
        email:req.session.email,
    });
})

module.exports=router;