const URL=require("../models/url");
const shortid = require("shortid-extend");
async function handleCreateShortId(req,res){
    const body=req.body;
    if(!body){
        return res.status(400).json({status:"error"});
    }
    
    const shortUrl=shortid.generate();
   const result= await URL.create({
        redirectUrl:body.url,
        shortId:shortUrl,
        visitHistory:[],
        createdBy:req.user._id,
        createdBy_email:req.user.email,
    })
    if(req.user.role=="ADMIN"){
    
    return res.render("admin_homepage",{
        id:shortUrl,
        

    })}
    else{
        return res.render("normal_homepage",{
            id:shortUrl,
            
    
        })
    }
    
}
async function handleGetUrl(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
  })
  console.log(entry.redirectUrl); 
   return res.redirect(entry.redirectUrl);
}
async function  getTotalClicks(req,res) {
    const shortId=req.params.shortId;
    const entry=await URL.findOne({
        shortId
    })
    const clicks=entry.visitHistory.length;
    return res.json({totalClicks:clicks,result:entry.visitHistory});
    
}
module.exports={
    handleCreateShortId,
    handleGetUrl,
    getTotalClicks
}