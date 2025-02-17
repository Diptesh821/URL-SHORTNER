const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'pikudipteshsingh@gmail.com',
        pass:'cakpthvjlrhkfoho',

    },
});
module.exports={transporter};