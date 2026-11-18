import asyncHandler from "../../../../utils/asyncHandler.js";

import {
  getOwners,
  getOwner,
  blockOwner,
  activateOwner,
  deleteOwner,
} from "./ownerService.js";

// GET ALL OWNERS

export const getAllOwners = asyncHandler(async (req, res) => {
  const owners = await getOwners(req.query);

  res.status(200).json({
    success: true,

    data: owners,
  });
});

// GET OWNER BY ID

export const getSingleOwner = asyncHandler(async (req, res) => {
  const owner = await getOwner(req.params.id);

  res.status(200).json({
    success: true,

    data: owner,
  });
});

// BLOCK OWNER

export const blockOwnerController = asyncHandler(async (req, res) => {
  const owner = await blockOwner(req.params.id);

  res.status(200).json({
    success: true,

    message: "Owner blocked successfully",

    data: owner,
  });
});

// ACTIVATE OWNER

export const activateOwnerController = asyncHandler(async (req, res) => {
  const owner = await activateOwner(req.params.id);

  res.status(200).json({
    success: true,

    message: "Owner activated successfully",

    data: owner,
  });
});

// DELETE OWNER

export const deleteOwnerController = asyncHandler(async (req, res) => {
  await deleteOwner(req.params.id);

  res.status(200).json({
    success: true,

    message: "Owner deleted successfully",
  });
});
