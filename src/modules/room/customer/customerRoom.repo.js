// import Room from "../../hotel/rooms.model.js";

// // GET ALL HOTEL ROOMS

// export const findCustomerRoomsRepo = async (hotelId) => {
//   return await Room.find({
//     hotelId,

//     status: "AVAILABLE",

//     isDeleted: false,
//   })

//     .select(
//       `
// roomType
// description
// price
// capacity
// quantity
// images
// amenities
// status
// `,
//     )

//     .sort({
//       createdAt: -1,
//     })

//     .lean();
// };

// // GET SINGLE ROOM

// export const findCustomerRoomRepo = async (roomId) => {
//   return await Room.findOne({
//     _id: roomId,

//     status: "AVAILABLE",

//     isDeleted: false,
//   })

//     .select(
//       `
// roomType
// description
// price
// capacity
// images
// amenities
// `,
//     )

//     .lean();
// };

import Room from "../../hotel/rooms.model.js";

// GET ALL ROOMS OF A HOTEL

export const findCustomerRoomsRepo = async (hotelId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [rooms, totalRooms] = await Promise.all([
    Room.find({
      hotelId,
      status: "AVAILABLE",
      isDeleted: false,
    })
      .select(
        `
        // roomType
        // price
        // capacity
        // quantity
        // images
        / roomType
 description
price
 capacity
 quantity
 images
 amenities
 status
      `,
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Room.countDocuments({
      hotelId,
      status: "AVAILABLE",
      isDeleted: false,
    }),
  ]);

  return {
    rooms,
    pagination: {
      page,
      limit,
      totalRooms,
      totalPages: Math.ceil(totalRooms / limit),
    },
  };
};

// GET SINGLE ROOM OF A HOTEL

export const findCustomerRoomRepo = async ( roomId) => {
  return await Room.findOne({
    _id: roomId,

    // hotelId,

    status: "AVAILABLE",

    isDeleted: false,
  })
    .select(
      `
      roomType
      description
      price
      capacity
      quantity
      images
      amenities
      status
    `,
    )
    .lean();
};
