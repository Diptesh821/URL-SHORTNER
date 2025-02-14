const USER=require("../models/user.js");
const bcrypt=require("bcrypt");
// const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require("../servers/auth.js")
async function handleNewUser(req,res) {
    console.log(req.body);
    const {name,email,password}=req.body;
    const saltrounds=10;
    const hashedpassword=await bcrypt.hash(password,saltrounds);
    if(email==="dipteshpiku@gmail.com"){
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
    const token=setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
    
    
    
}
module.exports={
    handleNewUser,
    handleLoginUser
}