import {
  findApprovedHotels,
  findHotelById,
} from "./customerHotel.repository.js";

import ApiError from "../../../utils/apiError.js";

export const getCustomerHotels = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    city,
    rating,
    amenities,
    search,
    location,
  } = filters;

  const query = {};

  // Location search city OR state
  if (location?.trim()) {
    query.$or = [
      {
        "location.city": {
          $regex: location.trim(),
          $options: "i",
        },
      },
      {
        "location.state": {
          $regex: location.trim(),
          $options: "i",
        },
      },
    ];
  }

  // Specific city filter
  if (city) {
    query["location.city"] = {
      $regex: city,
      $options: "i",
    };
  }

  // Rating filter
  if (rating) {
    query.rating = {
      $gte: Number(rating),
    };
  }

  // Amenities
  if (amenities) {
    query.amenities = {
      $in: Array.isArray(amenities) ? amenities : [amenities],
    };
  }

  // Hotel name search
  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  console.log("FINAL QUERY:", query);

  return await findApprovedHotels(query, {
    page: Number(page),
    limit: Number(limit),
  });
};

// export const getCustomerHotels = async (filters = {}) => {
//   const {
//     page = 1,
//     limit = 10,
//     city,
//     rating,
//     amenities,
//     search,
//     location,
//   } = filters;

//   const query = {};

//   const orConditions = [];

//   if (location?.trim()) {
//     orConditions.push(
//       {
//         "location.city": {
//           $regex: location.trim(),
//           $options: "i",
//         },
//       },
//       {
//         "location.state": {
//           $regex: location.trim(),
//           $options: "i",
//         },
//       },
//     );
//   }

//   if (orConditions.length) {
//     query.$or = orConditions;
//   }

//   if (city) {
//     query["location.city"] = {
//       $regex: city,
//       $options: "i",
//     };
//   }

//   if (rating) {
//     query.rating = {
//       $gte: Number(rating),
//     };
//   }

//   if (amenities) {
//     query.amenities = {
//       $in: Array.isArray(amenities) ? amenities : [amenities],
//     };
//   }

//   if (search) {
//     query.name = {
//       $regex: search,
//       $options: "i",
//     };
//   }

//   console.log(query);

//   return await findApprovedHotels(query, {
//     page: Number(page),
//     limit: Number(limit),
//   });
// };

export const getCustomerHotelDetails = async (id) => {
  const hotel = await findHotelById(id);

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};
