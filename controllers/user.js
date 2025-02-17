const USER=require("../models/user.js");
const bcrypt=require("bcrypt");
const nodemailer=require("nodemailer");
const {transporter}=require("../nodemailer/transporter.js")
// const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require("../servers/auth.js")
async function handleNewUser(req,res) {
    console.log(req.body);
    const {name,email,password}=req.body;
    const user=await USER.findOne({email});
    if(user){
        return res.send(`<script>
            alert('User already exists. LOGIN');
            window.location.href='/login' </script>`);
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.send(
            `<script>
            alert("Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, number, and special character.");
            window.location.href="/signup";

            </script>`
        )
  
    }
    const saltrounds=10;
    const hashedpassword=await bcrypt.hash(password,saltrounds);
    if(name==="Diptesh Singh"){
    await USER.create({
        
        name:name,
        email:email,
        password:hashedpassword,
        passkey:"piku2112",
        role:"ADMIN",
    })
}
    else{
    await USER.create({
        
        name:name,
        email:email,
        password:hashedpassword,
        role:"NORMAL",
    })
}
    return res.redirect("/");
}
async function handleLoginUser(req,res) {
    console.log(req.body);
   
    const {email,password}=req.body;
    const user=await USER.findOne({
        email
    });
    console.log(user);
    if(!user){
        return res.send(`<script>
            alert('Invalid email or password');
            window.location.href='/login' </script>`);
           
        
        
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch){
        return res.send(`<script>
            alert('Invalid email or password');
            window.location.href='/login' </script>`);
    }
    const otp=Math.floor(100000+(Math.random()*900000)).toString();
    const expiresAt=Date.now()+5*60*1000;
    const userr=await USER.updateOne(
        {email:email},
        {$set:{otp:otp,
            expiresAt:expiresAt,
        }},
        
    );
    const mailOptions={
        from:'"Diptesh Singh" <pikudipteshsingh@gmail.com>',
        to:email,
        subject:'OTP for login verification',
        text:`Your OTP is ${otp}`,
        html:`<p>Your OTP is <strong>${otp}</strong></p>`,
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.error('Error sending email:',error);
        }
        console.log("Email message send successfully",info.messageId);
    })
    req.session.isUserVerified=true;
   
    return res.redirect("/otp_verification");
    
    
    
}
async function otpVerify(req,res) {
    const {otp}=req.body;
   const user= await USER.findOne({otp:otp});
   if(!user){ 
    return res.send(`<script>
    alert('Invalid OTP');
    window.location.href='/otp_verification' </script>`);
   }
   if(user.expiresAt < Date.now()){
    return res.send(`<script>
        alert('OTP session expired');
        window.location.href='/login' </script>`);
   }
   await USER.updateOne({otp:otp},
    {$unset: {otp:1,expiresAt:1}}
   );
   req.session.isUserVerified=false;
   if(req.session.purpose==="reset password"){
    req.session.isReset=true;
    req.session.email=user.email;
    return res.redirect("/reset-password");

   }
   
   const token=setUser(user);
   res.cookie("token",token);
   res.redirect("/");
    
}
async function resetPassword(req,res){
       const email=req.session.email;
       const {password}=req.body;
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
       if(!passwordRegex.test(password)){
        return res.send(
            `<script>
            alert("Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, number, and special character.");
            window.location.href="/reset-password";

            </script>`
        )
       }
       const saltrounds=10;
       const hashedpassword=await bcrypt.hash(password,saltrounds);
       await USER.updateOne({email:email},{$set:{password:hashedpassword}}

       );
       req.session.isReset=false;
       req.session.purpose=null;
       req.session.email=null;
       return res.send(
        `<script>
        alert("Password updated successfully.Now you can proceed to login");
        window.location.href="/login";

        </script>`
    )
}
module.exports={
    handleNewUser,
    handleLoginUser,
    otpVerify,
    resetPassword,
}