import mongoose from "mongoose";


const roomSchema = new mongoose.Schema(
{
    // Which hotel owns this room
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
        required:true
    },


    roomType:{
        type:String,
        required:true,
        trim:true
    },


    description:{
        type:String,
        trim:true
    },


    // Price per night
    price:{
        type:Number,
        required:true,
        min:0
    },


    // Maximum guests
    capacity:{
        adults:{
            type:Number,
            required:true,
            default:1
        },

        children:{
            type:Number,
            default:0
        }
    },


    // Total rooms of this type
    quantity:{
        type:Number,
        required:true,
        min:1
    },


    images:[
        {
            url:{
                type:String,
                required:true
            },

            publicId:{
                type:String,
                required:true
            }
        }
    ],


    amenities:[
        {
            type:String
        }
    ],


    status:{
        type:String,
        enum:[
            "AVAILABLE",
            "UNAVAILABLE",
            "BLOCKED"
        ],
        default:"AVAILABLE"
    },


    isDeleted:{
        type:Boolean,
        default:false
    }


},
{
    timestamps:true
}
);



const Room = mongoose.model(
    "Room",
    roomSchema
);


export default Room;