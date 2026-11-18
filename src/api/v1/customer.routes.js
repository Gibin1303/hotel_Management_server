import express from "express";

import {
  getHotels,
  getHotelDetails,
} from "../../modules/hotel/customer/customerHotel.controller.js";
import {
  getCustomerRoomController,
  getCustomerRoomsController,
} from "../../modules/room/customer/customerRoom.controller.js";
import { createBookingController } from "../../modules/booking/bookingController.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
  paymentController,
  verifyPayment,
} from "../../modules/payment/paymentConroller.js";

const router = express.Router();

// GET ALL APPROVED HOTELS

router.get("/", getHotels);

// GET SINGLE HOTEL DETAILS

router.get("/:hotelId", getHotelDetails);

router.get("/hotels/:hotelId/rooms", getCustomerRoomsController);

// Get single room

router.get("/rooms/:roomId", getCustomerRoomController);

// booking

router.post("/booking", authMiddleware, createBookingController);

router.post("/payment/:bookingId", authMiddleware, paymentController);
router.post("/verify", authMiddleware, verifyPayment);

export default router;
