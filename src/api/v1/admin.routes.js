import express from "express";

import {
  getProfile,
  updateProfile,
  updatePermissions,
  deleteProfile,
} from "../../modules/users/admin/adminController.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { authorize } from "../../middleware/role.middleware.js";

import {
  getAllUsers,
  getSingleUser,
  blockUserController,
  activateUserController,
  deleteUserController,
} from "../../modules/users/admin/userManage/userManagementController.js";
import {
  activateOwnerController,
  blockOwnerController,
  deleteOwnerController,
  getAllOwners,
  getSingleOwner,
} from "../../modules/users/admin/ownerManage/ownerController.js";
import {
  approveHotelController,
  blockHotelController,
  deleteHotelController,
  getAllHotels,
  getSingleHotel,
  rejectHotelController,
  unblockHotelController,
} from "../../modules/users/admin/hotelManage/hotelController.js";
import { ROLES } from "../../constants/roles.js";
import {
  getAllBookings,
  getSingleBooking,
  updateBooking,
} from "../../modules/users/admin/bookingManage/bookingAdminController.js";

const router = express.Router();

// Get admin profile

router.get("/profile", authMiddleware, authorize(ROLES.ADMIN), getProfile);

// Update admin profile

router.patch("/profile", authMiddleware, authorize(ROLES.ADMIN), updateProfile);

// Update admin permissions

router.patch(
  "/permissions",
  authMiddleware,
  authorize(ROLES.ADMIN),
  updatePermissions,
);

// Delete admin profile

router.delete(
  "/profile",
  authMiddleware,
  authorize(ROLES.ADMIN),
  deleteProfile,
);

//admin userMAnagement

router.get("/users", authMiddleware, authorize(ROLES.ADMIN), getAllUsers);

router.get("/users/:id", authMiddleware, authorize(ROLES.ADMIN), getSingleUser);

router.patch(
  "/users/:id/block",
  authMiddleware,
  authorize(ROLES.ADMIN),
  blockUserController,
);

router.patch(
  "/users/:id/activate",
  authMiddleware,
  authorize(ROLES.ADMIN),
  activateUserController,
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  deleteUserController,
);

// owner managemant

router.get("/owner", authMiddleware, authorize(ROLES.ADMIN), getAllOwners);

// GET OWNER BY ID
router.get(
  "/owner/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  getSingleOwner,
);

// BLOCK OWNER
router.patch(
  "/owner/:id/block",
  authMiddleware,
  authorize(ROLES.ADMIN),
  blockOwnerController,
);

// ACTIVATE OWNER
router.patch(
  "/owner/:id/activate",
  authMiddleware,
  authorize(ROLES.ADMIN),
  activateOwnerController,
);

// DELETE OWNER
router.delete(
  "/owner/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  deleteOwnerController,
);

// hotel management

router.get("/hotels", authMiddleware, authorize(ROLES.ADMIN), getAllHotels);

// GET SINGLE HOTEL

router.get(
  "/hotel/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  getSingleHotel,
);

// APPROVE HOTEL

router.patch(
  "/hotel/:id/approve",
  authMiddleware,
  authorize(ROLES.ADMIN),
  approveHotelController,
);

// REJECT HOTEL

router.patch(
  "/hotel/:id/reject",
  authMiddleware,
  authorize(ROLES.ADMIN),
  rejectHotelController,
);

// BLOCK HOTEL

router.patch(
  "/hotel/:id/block",
  authMiddleware,
  authorize(ROLES.ADMIN),
  blockHotelController,
);

// UNBLOCK HOTEL

router.patch(
  "/hotel/:id/unblock",
  authMiddleware,
  authorize(ROLES.ADMIN),
  unblockHotelController,
);

// DELETE HOTEL

router.delete(
  "/hotel/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  deleteHotelController,
);

//////booking-----////

router.get("/bookings", authMiddleware, authorize(ROLES.ADMIN), getAllBookings);

router.get(
  "/bookings/:id",
  authMiddleware,
  authorize(ROLES.ADMIN, ROLES.CUSTOMER),
  getSingleBooking,
);

router.patch(
  "/bookings/:id/status",
  authMiddleware,
  authorize(ROLES.ADMIN),
  updateBooking,
);

export default router;
