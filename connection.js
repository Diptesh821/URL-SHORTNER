const mongoose=require("mongoose");
async function connectMongoDb(url){
    return await mongoose.connect(url).then(()=>{

        console.log("mongodb connected")
    }).catch((err)=>{
        console.log("error:",err);
    });
}
module.exports={connectMongoDb
} 