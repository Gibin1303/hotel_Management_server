import ApiError from "../../../../utils/apiError.js";

import {
    findAllHotels,
    countHotels,
    findHotelById,
    approveHotel,
    rejectHotel,
    blockHotel,
    unblockHotel,
    deleteHotel
}
from "./hotelRepo.js";


// GET ALL HOTELS

export const getHotels = async (query) => {

    const {
        status,
        page = 1,
        limit = 10
    } = query;


    const filter = {};


    if(status){

        filter.status = status;

    }


    const skip =
        (page - 1) * limit;


    const hotels =
        await findAllHotels({

            filter,

            skip,

            limit:Number(limit)

        });


    const total =
        await countHotels(filter);



    return {

        hotels,

        pagination:{

            total,

            page:Number(page),

            limit:Number(limit),

            totalPages:
            Math.ceil(total / limit)

        }

    };

};



// GET SINGLE HOTEL

export const getHotel = async (hotelId)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }


    return hotel;

};



// APPROVE HOTEL

export const approveHotelService = async (
    hotelId,
    adminId
)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }



    if(hotel.status !== "PENDING"){

        throw new ApiError(
            400,
            "Only pending hotels can be approved"
        );

    }



    return await approveHotel(

        hotelId,

        {
            approvedBy:adminId,

            approvedAt:new Date()

        }

    );

};



// REJECT HOTEL

export const rejectHotelService = async(
    hotelId,
    reason,
    adminId
)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }



    if(hotel.status !== "PENDING"){

        throw new ApiError(
            400,
            "Only pending hotels can be rejected"
        );

    }



    return await rejectHotel(

        hotelId,

        {
            rejectedBy:adminId,

            rejectedAt:new Date(),

            rejectionReason:reason

        }

    );

};



// BLOCK HOTEL

export const blockHotelService = async(
    hotelId,
    reason
)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }



    return await blockHotel(

        hotelId,

        reason

    );

};



// UNBLOCK HOTEL

export const unblockHotelService = async(
    hotelId
)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }



    return await unblockHotel(
        hotelId
    );

};



// DELETE HOTEL

export const deleteHotelService = async(
    hotelId
)=>{


    const hotel =
        await findHotelById(
            hotelId
        );


    if(!hotel){

        throw new ApiError(
            404,
            "Hotel not found"
        );

    }



    return await deleteHotel(
        hotelId
    );

};