import asyncHandler from "../../../../utils/asyncHandler.js";

import {
    getHotels,
    getHotel,
    approveHotelService,
    rejectHotelService,
    blockHotelService,
    unblockHotelService,
    deleteHotelService
}
from "./hotelService.js";



// GET ALL HOTELS (ADMIN)

export const getAllHotels = asyncHandler(
async(req,res)=>{


    const result =
        await getHotels(
            req.query
        );


    res.status(200).json({

        success:true,

        data:result

    });


});



// GET SINGLE HOTEL

export const getSingleHotel = asyncHandler(
async(req,res)=>{


    const hotel =
        await getHotel(
            req.params.id
        );


    res.status(200).json({

        success:true,

        data:hotel

    });


});



// APPROVE HOTEL

export const approveHotelController = asyncHandler(
async(req,res)=>{


    const hotel =
        await approveHotelService(

            req.params.id,

            req.user.id

        );


    res.status(200).json({

        success:true,

        message:"Hotel approved successfully",

        data:hotel

    });


});



// REJECT HOTEL

export const rejectHotelController = asyncHandler(
async(req,res)=>{


    const {
        reason
    } = req.body;


    const hotel =
        await rejectHotelService(

            req.params.id,

            reason,

            req.user.id

        );


    res.status(200).json({

        success:true,

        message:"Hotel rejected successfully",

        data:hotel

    });


});



// BLOCK HOTEL

export const blockHotelController = asyncHandler(
async(req,res)=>{


    const {
        reason
    } = req.body;


    const hotel =
        await blockHotelService(

            req.params.id,

            reason

        );


    res.status(200).json({

        success:true,

        message:"Hotel blocked successfully",

        data:hotel

    });


});



// UNBLOCK HOTEL

export const unblockHotelController = asyncHandler(
async(req,res)=>{


    const hotel =
        await unblockHotelService(

            req.params.id

        );


    res.status(200).json({

        success:true,

        message:"Hotel unblocked successfully",

        data:hotel

    });


});



// DELETE HOTEL

export const deleteHotelController = asyncHandler(
async(req,res)=>{


    await deleteHotelService(

        req.params.id

    );


    res.status(200).json({

        success:true,

        message:"Hotel deleted successfully"

    });


});
