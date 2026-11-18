import asyncHandler from "../../../../utils/asyncHandler.js";

import {
    getBookings,
    getBooking,
    changeBookingStatus
}
from "./bookingAdminService.js";



// GET ALL BOOKINGS

export const getAllBookings =
asyncHandler(async(req,res)=>{


    const data =
    await getBookings(req.query);


    res.status(200).json({

        success:true,

        data

    });


});




// GET SINGLE BOOKING

export const getSingleBooking =
asyncHandler(async(req,res)=>{


    const booking =
    await getBooking(
        req.params.id
    );


    res.status(200).json({

        success:true,

        data:booking

    });


});




// UPDATE STATUS

export const updateBooking =
asyncHandler(async(req,res)=>{


    const booking =
    await changeBookingStatus(

        req.params.id,

        req.body.status

    );


    res.status(200).json({

        success:true,

        message:"Booking status updated",

        data:booking

    });


});