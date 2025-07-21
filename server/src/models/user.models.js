import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {

    },{
        timestamps:true
    })
    ;

export default User = mongoose.model("userSchema", User);
