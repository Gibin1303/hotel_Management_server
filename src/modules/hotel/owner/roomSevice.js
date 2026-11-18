import {
    createRoomRepo,
    findRoomsByHotelRepo,
    findRoomByIdRepo,
    updateRoomRepo,
    deleteRoomRepo
}
from "./room.repo.js";



// CREATE

export const createRoomService = async (
    hotelId,
    data
)=>{


    return await createRoomRepo({

        hotelId,

        ...data

    });


};



// GET ALL

export const getHotelRoomsService = async (
    hotelId
)=>{

    return await findRoomsByHotelRepo(
        hotelId
    );

};



// GET SINGLE

export const getRoomService = async (
    roomId,
    hotelId
)=>{

    return await findRoomByIdRepo(
        roomId,
        hotelId
    );

};



// UPDATE

export const updateRoomService = async (
    roomId,
    hotelId,
    data
)=>{

    return await updateRoomRepo(
        roomId,
        hotelId,
        data
    );

};



// DELETE

export const deleteRoomService = async (
    roomId,
    hotelId
)=>{

    return await deleteRoomRepo(
        roomId,
        hotelId
    );

};