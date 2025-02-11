const express=require("express"); 
const {restrictTo}=require("../middlewares/auth")
const router=express.Router();
const {handleCreateShortId,handleGetUrl,getTotalClicks}=require("../controllers/url.js");
router.route("/").post(restrictTo(["NORMAL","ADMIN"]),handleCreateShortId);
router.route("/:shortId").get(restrictTo(["NORMAL","ADMIN"]),handleGetUrl);
router.route("/analytics/:shortId").get(getTotalClicks);
 module.exports=router; 