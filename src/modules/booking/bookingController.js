import asyncHandler from "../../utils/asyncHandler.js";
import { createBookingService, getBookingDetails } from "./bookingService.js";

export const createBookingController = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.user.id, req.body);

  res.status(201).json({
    success: true,

    data: booking,
  });
});

export const getSingleBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const bookingdata = await getBookingDetails(bookingId);

  res.status(201).json({ message: success, data: bookingdata });
});
