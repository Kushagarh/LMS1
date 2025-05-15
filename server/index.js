import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from './routes/user.route.js'
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";

dotenv.config({});

// call database connection here
connectDB();

const app=express();


const PORT= process.env.PORT||8080;

// default middleware
app.use(express.json());
app.use(cookieParser());

const _dirname=path.resolve();

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));
app.use(cors({
    origin:"https://lms1-6da5.onrender.com",
    credentials:true
}));

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);


app.get('/home',(req,res)=>{
     res.status(200).json({
        success:true,
        message:"hlo from backend"
    })
})

app.use(express.static(path.join(_dirname,"/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

app.listen(PORT ,()=>{
    console.log(`listening to port ${PORT}`);
})