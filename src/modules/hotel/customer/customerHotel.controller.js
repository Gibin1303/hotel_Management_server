import asyncHandler from "../../../utils/asyncHandler.js";

import {
getCustomerHotels,
getCustomerHotelDetails
}
from "./customerHotel.service.js";



// GET ALL HOTELS

export const getHotels =
asyncHandler(async(req,res)=>{


const hotels =
await getCustomerHotels(req.query);



res.status(200).json({

success:true,

data:hotels

});


});





// GET SINGLE HOTEL

export const getHotelDetails =
asyncHandler(async(req,res)=>{


const hotel =
await getCustomerHotelDetails(
    req.params.hotelId
);



res.status(200).json({

success:true,

data:hotel

});


});