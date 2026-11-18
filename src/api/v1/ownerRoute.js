import express from "express";

import {
  createHotelController,
  getOwnerHotelsController,
  getOwnerHotelController,
  updateOwnerHotelController,
  deleteOwnerHotelController,
} from "../../modules/hotel/owner/hotelController.js";

import { authMiddleware } from "../../../../backend/src/middleware/auth.middleware.js";

import { authorize } from "../../../../backend/src/middleware/role.middleware.js";
import { upload } from "../../modules/hotel/upload.js";
import {
  createRoomController,
  deleteRoomController,
  getRoomController,
  getRoomsController,
  updateRoomController,
} from "../../modules/hotel/owner/roomController.js";
import { getOwnerDashboardController } from "../../modules/hotel/owner/owner-dashboard/ownerController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorize("OWNER", "ADMIN"),
  getOwnerDashboardController,
);

router.use(authMiddleware, authorize("OWNER"));

router.post(
  "/hotels",
  upload.array("images", 5),
  (req, res, next) => {
    console.log("FILES AFTER MULTER:", req.files);
    console.log("BODY AFTER MULTER:", req.body);
    next();
  },
  createHotelController,
);

router.get("/hotels", getOwnerHotelsController);

router.get("/hotels/:id", getOwnerHotelController);

router.patch(
  "/hotels/:id",
  upload.array("images", 5),
  updateOwnerHotelController,
);

router.delete("/hotels/:id", deleteOwnerHotelController);

////// rooms //////

router.post(
  "/hotels/:hotelId/rooms",
  upload.array("images", 3),
  createRoomController,
);

router.get("/hotels/:hotelId/rooms", getRoomsController);

router.get("/hotels/:hotelId/rooms/:roomId", getRoomController);

router.patch("/hotels/:hotelId/rooms/:roomId", updateRoomController);

router.delete("/hotels/:hotelId/rooms/:roomId", deleteRoomController);

export default router;
