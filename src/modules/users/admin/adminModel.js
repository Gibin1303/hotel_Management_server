import mongoose from "mongoose";


const adminSchema = new mongoose.Schema(
{

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },


    permissions:[
        {
            type:String,
            enum:[
                "MANAGE_USERS",
                "MANAGE_OWNERS",
                "MANAGE_HOTELS",
                "MANAGE_BOOKINGS",
                "MANAGE_PAYMENTS",
                "VIEW_REPORTS"
            ]
        }
    ],


    lastLogin:{
        type:Date,
        default:null
    }


},
{
    timestamps:true
}
);



export default mongoose.model(
    "Admin",
    adminSchema
);