import Hotel from "../hotel.model.js";

export const findApprovedHotels = async (query = {}) => {
  
  const hotels = await Hotel.find({
    status: "APPROVED",
    isDeleted: false,
    ...query,
  }).select("name description images amenities rating totalReviews");

  return hotels;
};

export const findHotelById = async (hotelId) => {
   console.log("Searching hotel id:", hotelId);
  const hotel = await Hotel.findOne({
    _id: hotelId,

    status: "APPROVED",

    isDeleted: false,
  }).select("name description images amenities rating totalReviews");

  return hotel;
};
