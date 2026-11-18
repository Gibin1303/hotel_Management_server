import User from "../../../auth/auth.model.js";

// Get all users

export const findAllUsers = async ({ search, page = 1, limit = 10 }) => {
  const query = {
    role: "CUSTOMER",
  };

  if (search) {
    query.$or = [
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

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({
      createdAt: -1,
    });

  const total = await User.countDocuments(query);

  return {
    users,

    pagination: {
      total,
      page,
      limit,

      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get single user

export const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

// Update status

export const updateStatus = async (id, status) => {
  return await User.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    },
  ).select("-password");
};

// Delete user

export const removeUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
