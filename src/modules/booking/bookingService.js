import Room from "../../modules/hotel/rooms.model.js";
import Hotel from "../../modules/hotel/hotel.model.js";
import { createBookingRepo, getBookings } from "./bookingRepo.js";

import ApiError from "../../utils/apiError.js";
import bookingModel from "./booking.model.js";

export const createBookingService = async (customerId, data) => {
  const { hotelId, roomId, checkIn, checkOut, guests, roomsBooked } = data;

  // Check hotel

  const hotel = await Hotel.findOne({
    _id: hotelId,

    status: "APPROVED",

    isDeleted: false,
  });

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  // Check room

  const room = await Room.findOne({
    _id: roomId,

    hotelId,

    status: "AVAILABLE",

    isDeleted: false,
  });

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  // Check capacity

  if (
    guests.adults > room.capacity.adults ||
    guests.children > room.capacity.children
  ) {
    throw new ApiError(400, "Guest capacity exceeded");
  }

  // Calculate nights

  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
  );

  if (nights <= 0) {
    throw new ApiError(400, "Invalid dates");
  }

  // Calculate amount

  const subtotal = room.price * nights * roomsBooked;

  const booking = await createBookingRepo({
    customerId,

    hotelId,

    roomId,

    checkIn,

    checkOut,

    guests,

    roomsBooked,

    priceDetails: {
      pricePerNight: room.price,

      totalNights: nights,

      subtotal,

      platformFee: 0,

      totalAmount: subtotal,
    },

    bookingNumber: `HTL-${Date.now()}`,
  });

  return booking;
};


export const getBookingDetails = async (bookingId) => {
  const booking = await getBookings(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.bookingStatus === "CANCELLED") {
    throw new ApiError(400, "Booking cancelled");
  }

  return booking;
};
