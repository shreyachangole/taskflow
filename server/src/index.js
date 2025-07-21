import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import { app } from "./app.js";
import {connectDB} from "./db/index.js";

await connectDB()
.then(
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on PORT:${process.env.PORT}`)
    })
)
.catch(Error,()=>{
    console.log("Error occured while starting the server",Error);
})