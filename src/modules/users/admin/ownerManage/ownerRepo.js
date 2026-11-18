import User from "../../../auth/auth.model.js";

// GET ALL OWNERS
export const findAllOwners = async ({
  filter = {},
  skip = 0,
  limit = 10,
  sort = {
    createdAt: -1,
  },
}) => {
  return await User.find({
    role: "OWNER",
    isDeleted: { $in: [false, "false"] },
    // isDeleted: false,
    ...filter,
  })
    .select("-password -refreshToken")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

// GET OWNER BY ID
export const findOwnerById = async (ownerId) => {
  return await User.findOne({
    _id: ownerId,

    role: "OWNER",

    isDeleted: false,
  })
    .select("-password -refreshToken")
    .lean();
};

// BLOCK OWNER
export const blockOwnerById = async (ownerId) => {
  return await User.findOneAndUpdate(
    {
      _id: ownerId,

      role: "OWNER",

      isDeleted: false,
    },

    {
      $set: {
        status: "BLOCKED",
      },
    },

    {
      new: true,
    },
  ).select("-password -refreshToken");
};

// ACTIVATE OWNER
export const activateOwnerById = async (ownerId) => {
  return await User.findOneAndUpdate(
    {
      _id: ownerId,

      role: "OWNER",

      isDeleted: false,
    },

    {
      $set: {
        status: "ACTIVE",
      },
    },

    {
      new: true,
    },
  ).select("-password -refreshToken");
};

// DELETE OWNER (SOFT DELETE)
export const deleteOwnerById = async (ownerId) => {
  return await User.findOneAndUpdate(
    {
      _id: ownerId,

      role: "OWNER",

      isDeleted: false,
    },

    {
      $set: {
        isDeleted: true,
      },
    },

    {
      new: true,
    },
  ).select("-password -refreshToken");
};

// COUNT OWNERS
export const countOwners = async (filter = {}) => {
  return await User.countDocuments({
    role: "OWNER",

    isDeleted: false,

    ...filter,
  });
};
