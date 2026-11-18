import ApiError from "../../../utils/apiError.js";

import {
  createHotel,
  findOwnerHotels,
  findOwnerHotel,
  updateHotel,
  deleteHotel,
} from "./hotelRepo.js";

// Create

export const createHotelService = async (ownerId, data) => {
  return await createHotel({
    ownerId,

    ...data,

    status: "PENDING",
  });
};

// export const createHotelService = async (ownerId, data) => {
//   // Destructure flat form-data fields and restructure them to match your schema
//   const { name, description, address, city, state, country, amenities, ...rest } = data;

//   return await createHotel({
//     ownerId,
//     name,
//     description,
//     location: {
//       address,
//       city,
//       state,
//       country
//     },
//     images: data.images, // Passed from your controller
//     amenities: typeof amenities === "string" ? JSON.parse(amenities || "[]") : amenities,
//     status: "PENDING",
//     ...rest
//   });
// };

// Get all

export const getOwnerHotelsService = async (ownerId) => {
  return await findOwnerHotels(ownerId);
};

// Get one

export const getOwnerHotelService = async (hotelId, ownerId) => {
  const hotel = await findOwnerHotel(hotelId, ownerId);

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};

// Update

export const updateOwnerHotelService = async (hotelId, ownerId, data) => {
  console.log(data, "data from update hotel");

  if (data.location && typeof data.location === "string") {
    try {
      data.location = JSON.parse(data.location);
    } catch (err) {
      throw new ApiError(400, "Invalid JSON format for location");
    }
  }

  if (data.files && data.files.length > 0) {
    data.images = data.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    delete data.files;
  }
  const hotel = await updateHotel(hotelId, ownerId, data);

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};

// Delete

export const deleteOwnerHotelService = async (hotelId, ownerId) => {
  const hotel = await deleteHotel(hotelId, ownerId);

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};
