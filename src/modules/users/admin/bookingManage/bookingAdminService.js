import ApiError from "../../../../utils/apiError.js";

import {
    findAllBookings,
    countBookings,
    findBookingById,
    updateBookingStatus
}
from "./bookingAdminRepository.js";



// Get bookings

export const getBookings = async(query)=>{


    const {
        status,
        page=1,
        limit=10
    } = query;


    const filter={};


    if(status){

        filter.status=status;

    }


    const skip =
    (page-1)*limit;



    const bookings =
    await findAllBookings({

        filter,

        skip,

        limit:Number(limit)

    });



    const total =
    await countBookings(filter);



    return {

        bookings,


        pagination:{

            total,

            page:Number(page),

            limit:Number(limit),

            totalPages:
            Math.ceil(total/limit)

        }

    };


};



// Single booking

export const getBooking = async(id)=>{


    const booking =
    await findBookingById(id);


    if(!booking){

        throw new ApiError(
            404,
            "Booking not found"
        );

    }


    return booking;

};



// Change status

export const changeBookingStatus = async(
    id,
    status
)=>{


    const booking =
    await findBookingById(id);


    if(!booking){

        throw new ApiError(
            404,
            "Booking not found"
        );

    }



    return await updateBookingStatus(
        id,
        status
    );


};  