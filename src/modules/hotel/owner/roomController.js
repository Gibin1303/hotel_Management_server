import asyncHandler from "../../../utils/asyncHandler.js";

import {
  createRoomService,
  getHotelRoomsService,
  getRoomService,
  updateRoomService,
  deleteRoomService,
} from "./roomSevice.js";

// CREATE ROOM

export const createRoomController = asyncHandler(async (req, res) => {
  const images =
    req.files?.map((file) => ({
      url: file.path,

      publicId: file.filename,
    })) || [];

  console.log(req.body, "text datas");
  console.log(images, "images");

  const room = await createRoomService(
    req.params.hotelId,

    {
      ...req.body,
      capacity: JSON.parse(req.body.capacity),

      amenities: JSON.parse(req.body.amenities),

      images,
    },
  );

  res.status(201).json({
    success: true,

    data: room,
  });
});

// GET ALL ROOMS

export const getRoomsController = asyncHandler(async (req, res) => {
  const rooms = await getHotelRoomsService(req.params.hotelId);

  res.json({
    success: true,

    data: rooms,
  });
});

// GET SINGLE ROOM

export const getRoomController = asyncHandler(async (req, res) => {
  const room = await getRoomService(
    req.params.roomId,

    req.params.hotelId,
  );

  res.json({
    success: true,

    data: room,
  });
});

// UPDATE ROOM

export const updateRoomController = asyncHandler(async (req, res) => {
  const room = await updateRoomService(
    req.params.roomId,

    req.params.hotelId,

    req.body,
  );

  res.json({
    success: true,

    data: room,
  });
});

// DELETE ROOM

export const deleteRoomController = asyncHandler(async (req, res) => {
  const room = await deleteRoomService(
    req.params.roomId,

    req.params.hotelId,
  );

  res.json({
    success: true,

    data: room,
  });
});
