const secret="piku&*2112";
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