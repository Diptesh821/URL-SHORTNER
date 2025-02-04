const { type } = require("express/lib/response");
const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    redirectUrl:{
        type:String,
        required:true,
        
    },
    shortId:{
        type:String,
        required:true,
        unique:true,

    },
    visitHistory:[{timestamp:{
        type:Number,
    }}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    createdBy_email:{
        type:String,
        ref:"users"
    }
})
const URL=mongoose.model("url",userSchema);
module.exports=URL;