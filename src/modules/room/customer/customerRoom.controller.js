import asyncHandler from "../../../utils/asyncHandler.js";

import {
  getCustomerRoomsService,
  getCustomerRoomService
} from "./customerRoom.service.js";



// GET ALL ROOMS OF HOTEL

export const getCustomerRoomsController =
asyncHandler(async(req,res)=>{


    const {
      hotelId
    } = req.params;


    const page =
      Number(req.query.page) || 1;


    const limit =
      Number(req.query.limit) || 10;



    const rooms =
      await getCustomerRoomsService(
        hotelId,
        page,
        limit
      );



    res.status(200).json({

        success:true,

        data:rooms

    });


});




// GET SINGLE ROOM

export const getCustomerRoomController =
asyncHandler(async(req,res)=>{


    const {
      roomId
    } = req.params;



    const room =
      await getCustomerRoomService(
        roomId
      );



    res.status(200).json({

        success:true,

        data:room

    });


});