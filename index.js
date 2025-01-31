const express=require("express"); 
const app=express();
const PORT=8001;
const path=require("path");


const staticRouter=require("./routes/staticRouter.js");
const urlRoutes=require("./routes/url.js");
const userRoute=require("./routes/user.js")
const cookieparser=require("cookie-parser");
const {checkForAuthentication,restrictTo}=require("./middlewares/auth.js");

const {connectMongoDb}=require("./connection");
connectMongoDb("mongodb://127.0.0.1:27017/urlshortner");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthentication);


app.use("/user",userRoute);
app.use("/",staticRouter);
app.use("/url",urlRoutes);


app.listen(PORT,()=>{
    console.log(`mongo db connected ${PORT}`);
})