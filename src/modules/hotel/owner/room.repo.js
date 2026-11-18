import Room from "../rooms.model.js";


// CREATE ROOM
export const createRoomRepo = async (data) => {

    return await Room.create(data);

};



// GET ALL ROOMS OF HOTEL

export const findRoomsByHotelRepo = async (hotelId) => {

    return await Room.find({
        hotelId,
        isDeleted:false
    })
    .sort({
        createdAt:-1
    })
    .lean();

};



// GET SINGLE ROOM

export const findRoomByIdRepo = async (roomId, hotelId) => {

    return await Room.findOne({

        _id:roomId,

        hotelId,

        isDeleted:false

    }).lean();

};



// UPDATE ROOM

export const updateRoomRepo = async (
    roomId,
    hotelId,
    data
)=>{

    return await Room.findOneAndUpdate(

        {
            _id:roomId,
            hotelId,
            isDeleted:false
        },

        {
            $set:data
        },

        {
            new:true
        }

    );

};



// DELETE ROOM (SOFT DELETE)

export const deleteRoomRepo = async (
    roomId,
    hotelId
)=>{

    return await Room.findOneAndUpdate(

        {
            _id:roomId,
            hotelId,
            isDeleted:false
        },

        {
            $set:{
                isDeleted:true
            }
        },

        {
            new:true
        }

    );

};