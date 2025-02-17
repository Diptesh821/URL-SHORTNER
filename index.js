const express=require("express"); 
const session = require("express-session");
const path=require("path");

const app=express();
const PORT=8001;


const staticRouter=require("./routes/staticRoutes.js");
const urlRoutes=require("./routes/url.js");
const userRoute=require("./routes/user.js")
const resetRoute=require("./routes/resetpass.js");
const otpRoute=require("./routes/otp.js");

const cookieparser=require("cookie-parser");
const {checkForAuthentication,restrictTo}=require("./middlewares/auth.js");

const {connectMongoDb}=require("./connection");
connectMongoDb("mongodb://127.0.0.1:27017/urlshortner");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



//middlewares
app.use(session({
    secret: "1508", // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthentication);
app.use(express.static("public"));
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});



app.use("/user",userRoute);
app.use("/",staticRouter);
app.use("/url",urlRoutes);
app.use("/",resetRoute);
app.use("/",otpRoute);



app.listen(PORT,()=>{
    console.log(`mongo db connected ${PORT}`);
})