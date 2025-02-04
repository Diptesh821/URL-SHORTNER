const USER=require("../models/user.js");
// const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require("../servers/auth.js")
async function handleNewUser(req,res) {
    console.log(req.body);
    const {name,email,password}=req.body;
    if(email=="dipteshpiku@gmail.com"){
    await USER.create({
        
        name:name,
        email:email,
        password:password,
        role:"ADMIN",
    })
}
    else{
    await USER.create({
        
        name:name,
        email:email,
        password:password,
        role:"NORMAL",
    })
}
    return res.redirect("/");
}
async function handleLoginUser(req,res) {
    console.log(req.body);
   
    const {email,password}=req.body;
    const user=await USER.findOne({
        email,
        password
    });
    console.log(user);
    if(!user){
        
        return res.redirect("/signup"); 
    }
    const token=setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
    // return res.json({token});
    
    
}
module.exports={
    handleNewUser,
    handleLoginUser
}