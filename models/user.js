const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{

        type:String,
        required:true,
        unique:true, 
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
const USER =mongoose.model("users",userSchema);
module.exports=USER;

