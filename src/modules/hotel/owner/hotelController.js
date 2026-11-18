import redis from "../../../infrastructure/cache/redis.cache.js";
import asyncHandler from "../../../utils/asyncHandler.js";

import {
  createHotelService,
  getOwnerHotelsService,
  getOwnerHotelService,
  updateOwnerHotelService,
  deleteOwnerHotelService,
} from "./hotelService.js";

// CREATE HOTEL

export const createHotelController = asyncHandler(async (req, res) => {
  const images =
    req.files?.map((file) => ({
      url: file.path,
      publicId: file.filename,
    })) || [];

  console.log(images);

  const hotel = await createHotelService(
    req.user.id || req.user._id,

    {
      ...req.body,
      images: images.length > 0 ? images : [],
    },
  );

  res.status(201).json({
    success: true,

    data: hotel,
  });
});

// GET ALL

export const getOwnerHotelsController = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;

  const cacheKey = `owner:${ownerId}:hotels`;

  // 1. Check if data exists in Redis cache first
  // const cachedData = await redis.get(cacheKey);
  // if (cachedData) {
  //   return res.json({
  //     success: true,
  //     data: JSON.parse(cachedData),
  //   });
  // }
  const hotels = await getOwnerHotelsService(ownerId);

  // await redis.set(cacheKey, JSON.stringify(hotels), "EX", 10);

  res.json({
    success: true,

    data: hotels,
  });
});

// GET SINGLE

export const getOwnerHotelController = asyncHandler(async (req, res) => {
  const hotel = await getOwnerHotelService(
    req.params.id,

    req.user.id,
  );

  res.json({
    success: true,

    data: hotel,
  });
});

// UPDATE

export const updateOwnerHotelController = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("PARAMS:", req.params);

  const hotel = await updateOwnerHotelService(
    req.params.id,

    req.user.id,

    {
      ...req.body,
      files: req.files,
    },
  );

  res.json({
    success: true,

    data: hotel,
  });
});

// DELETE

export const deleteOwnerHotelController = asyncHandler(async (req, res) => {
  const hotel = await deleteOwnerHotelService(
    req.params.id,

    req.user.id,
  );

  res.json({
    success: true,

    data: hotel,
  });
});
