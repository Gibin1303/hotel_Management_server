import ApiError from "../../../../utils/apiError.js";

import {
  findAllOwners,
  findOwnerById,
  blockOwnerById,
  activateOwnerById,
  deleteOwnerById,
  countOwners,
} from "./ownerRepo.js";

// GET ALL OWNERS

export const getOwners = async (query) => {
  const { page = 1, limit = 10, search, status } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },

      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const owners = await findAllOwners({
    filter,

    skip: Number(skip),

    limit: Number(limit),
  });

  const total = await countOwners(filter);

  return {
    owners,

    pagination: {
      total,

      page: Number(page),

      limit: Number(limit),

      totalPages: Math.ceil(total / limit),
    },
  };
};

// GET SINGLE OWNER

export const getOwner = async (ownerId) => {
  const owner = await findOwnerById(ownerId);

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  return owner;
};

// BLOCK OWNER

export const blockOwner = async (ownerId) => {
  const owner = await findOwnerById(ownerId);

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  if (owner.status === "BLOCKED") {
    throw new ApiError(400, "Owner already blocked");
  }

  return await blockOwnerById(ownerId);
};

// ACTIVATE OWNER

export const activateOwner = async (ownerId) => {
  const owner = await findOwnerById(ownerId);

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  if (owner.status === "ACTIVE") {
    throw new ApiError(400, "Owner already active");
  }

  return await activateOwnerById(ownerId);
};

// DELETE OWNER

export const deleteOwner = async (ownerId) => {
  const owner = await findOwnerById(ownerId);

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  return await deleteOwnerById(ownerId);
};
