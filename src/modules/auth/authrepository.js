import User from "./auth.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({
    email,
  });
};

export const verifyUserEmail = async (email) => {
  return await User.findOneAndUpdate(
    {
      email,
    },
    {
      isVerified: true,
    },
    {
      new: true,
    },
  );
};

//login

export const findUserByEmails = async (email) => {
  return await User.findOne({
    email,
  });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};
