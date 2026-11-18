import jwt from "jsonwebtoken";

import ApiError from "../utils/apiError.js";
import { findUserById } from "../modules/auth/authrepository.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token required");
    }

    const accessToken = authHeader.split(" ")[1];

    // Verify JWT

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Find user

    const user = await findUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Check account status

    if (user.status === "BLOCKED") {
      throw new ApiError(403, "Account blocked");
    }

    // Attach user

    req.user = {
      id: user._id,

      role: user.role,

      email: user.email,
    };

    

    next();
  } catch (error) {
    next(error);
  }
};
