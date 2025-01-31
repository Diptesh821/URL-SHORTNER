const express=require("express"); 
const router=express.Router();
const {handleCreateShortId,handleGetUrl,getTotalClicks}=require("../controllers/url.js");
router.route("/").post(handleCreateShortId);
router.route("/:shortId").get(handleGetUrl);
router.route("/analytics/:shortId").get(getTotalClicks);
 module.exports=router; 