import mongoose from "mongoose";

const todoSchema=new mongoose.Schema(
    {

    },
    {
        timestamps:true
    }
);

export default Todo=mongoose.model("todoSchema",Todo);