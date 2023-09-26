import db from "./dbConfig.js";
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"plan"
    },
    startingDate:{
        type:String,
        required:true
    },
    endingDate:{
        type:String,
        required:true
    }
})

export const Subscription = mongoose.model("subscription",SubscriptionSchema);