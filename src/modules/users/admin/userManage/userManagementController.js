import asyncHandler from "../../../../utils/asyncHandler.js";
import {
  getUsers,
  getUser,
  blockUser,
  activateUser,
  deleteUser,
} from "./userManageService.js";

// GET ALL USERS

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getUsers(req.query);

  res.status(200).json({
    success: true,

    data: users,
  });
});

// GET USER BY ID

export const getSingleUser = asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id);

  res.status(200).json({
    success: true,

    data: user,
  });
});

// BLOCK USER

export const blockUserController = asyncHandler(async (req, res) => {
  const user = await blockUser(req.params.id);

  res.status(200).json({
    success: true,

    data: user,
  });
});

// ACTIVATE USER

export const activateUserController = asyncHandler(async (req, res) => {
  const user = await activateUser(req.params.id);

  res.status(200).json({
    success: true,

    data: user,
  });
});

// DELETE USER

export const deleteUserController = asyncHandler(async (req, res) => {
  await deleteUser(req.params.id);

  res.status(200).json({
    success: true,

    message: "User deleted successfully",
  });
});
