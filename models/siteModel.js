import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    siteAddress:{
        type:String,
        required:true
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    openTime:{
        type:String,
        required:true
    },
    closeTime:{
        type:String,
        required:true
    },
    contactPhone:{
        type:Number,
        required:true
    },
    contactEmail:{
        type:String,
        required:true
    },
    Accommodation:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },
    ticketQuantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },

},{timestamps:true})

export default mongoose.model('Sites', siteSchema)