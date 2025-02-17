const express=require("express"); 
const router=express.Router();
const {handleNewUser,handleLoginUser,otpVerify,resetPassword}=require("../controllers/user.js");
router.route("/").post(handleNewUser);
router.post("/login",handleLoginUser);
router.post("/otp-verify",otpVerify);
router.post("/reset",resetPassword);
module.exports=router;