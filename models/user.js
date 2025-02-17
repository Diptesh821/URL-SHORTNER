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
        default:"NORMAL",
    },
    password:{
        type:String,
        required:true
    },
    passkey:{
        type:String,
        required:function(){
            return this.role==="ADMIN";
        },
        
       
    },
    otp:{
        type:String,
    },
    expiresAt:{
        type:Number,
    },

},{
    timestamps:true
})
const USER =mongoose.model("users",userSchema);
module.exports=USER;

