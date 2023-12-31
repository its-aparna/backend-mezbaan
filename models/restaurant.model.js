
import db from "./dbConfig.js"
import mongoose from "mongoose"

const RestaurantSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        lattitude:{
            type:String,
            required:true
        },
        longitude:{
            type:String,
           required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        details:{
            type:String,
            // required:true
        }
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    openingTime:{
        type:String,
        required:true
    },
    closingTime:{
        type:String,
        required:true
    },
    totalTables:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    fssai:{
        type:String,
       required:true
    },
    type:{
        type:String,
        required:true
    },
    avgCostPer2:{
        type:String,
       required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    images:[{
        type:String
    }],
    menus:[{
        type:String
    }],
    facilities:[{
        type:String,
        required:true
    }],
    cuisines:[{
        type:String
    }]
})

export const Restaurant = mongoose.model("restaurant",RestaurantSchema);