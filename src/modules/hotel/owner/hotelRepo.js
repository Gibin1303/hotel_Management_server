import Hotel from "../hotel.model.js";

// Create

export const createHotel = async (data) => {
  return await Hotel.create(data);
};

// Get owner hotels

// >>>>>> page added so check on more data frontend update based on page

export const findOwnerHotels = async (ownerId, page = 1, limit = 20) => {
  return await Hotel.find({
    ownerId,

    isDeleted: false,
  })
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit) // 2. Skip records for pagination
    .limit(limit)
    .lean();
};

// Get single

export const findOwnerHotel = async (hotelId, ownerId) => {
  return await Hotel.findOne({
    _id: hotelId,

    ownerId,

    isDeleted: false,
  });
};

// Update

export const updateHotel = async (hotelId, ownerId, data) => {
  return await Hotel.findOneAndUpdate(
    {
      _id: hotelId,

      ownerId,

      isDeleted: false,
    },

    data,

    {
      new: true,
    },
  );
};

// Delete

export const deleteHotel = async (hotelId, ownerId) => {
  return await Hotel.findOneAndUpdate(
    {
      _id: hotelId,

      ownerId,
    },

    {
      isDeleted: true,
    },

    {
      new: true,
    },
  );
};
