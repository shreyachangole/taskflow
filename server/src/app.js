import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import todos from "./routes/todos.js";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

// routes
app.use('/api/auth',auth)
app.use('/api/todos',todos);

export{app};
