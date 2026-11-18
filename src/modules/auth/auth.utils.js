import { generateToken } from "../../utils/jwt.js";

export const createAuthToken = (user) => {
  return generateToken({
    id: user._id,
    role: user.role,
  });
};

// export const sanitizeUser = (user) => {

//     const userObject = user.toObject();

//     delete userObject.password;

//     return userObject;

// };

export const sanitizeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
