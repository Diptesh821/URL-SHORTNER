require("dotenv").config();
const secret=process.env.JWT_SECRET;
const jwt=require("jsonwebtoken");
function setUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role,
        name:user.name,

    }
    return jwt.sign(payload,secret);

}
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret);
        
    } catch (error) {
        return null;
    }
   
    
}
module.exports={
    setUser,
    getUser
}