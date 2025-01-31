const express=require("express"); 
const router=express.Router();
const {handleNewUser,handleLoginUser}=require("../controllers/user.js");
router.route("/").post(handleNewUser);
router.post("/login",handleLoginUser);
module.exports=router;