import mongoose from "mongoose";

const userScema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        default:""

    },
    serchHistroy:{
        type:Array,
        default:[]
    }
})

export const User = mongoose.model("user",userScema)