const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth:{
        user:'pikudipteshsingh@gmail.com',
        pass:'lcnrlbqqwqqtmukp',

    },
});
module.exports={transporter};