import {
  createUser,
  verifyUserEmail,
  findUserByEmail,
} from "./authrepository.js";

import { hashPassword } from "../../utils/bcrypt.js";

import { createAuthToken, sanitizeUser } from "./auth.utils.js";

import ApiError from "../../utils/apiError.js";

import redis from "../../infrastructure/cache/redis.cache.js";

import { generateOTP } from "../../utils/otp.js";
// import { sendEmail } from "../../infrastructure/email/email.provider.js";
import { emailQueue } from "../../ques/email.queue.js";

import { findUserByEmails } from "./authrepository.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { createRefreshToken } from "../../utils/jwt.js";
import { findUserById } from "./authrepository.js";
import { generateToken } from "../../utils/jwt.js";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    ...data,

    password: hashedPassword,
  });

  const otp = generateOTP();

  // Store OTP in Redis

  await redis.set(`verify:${user.email}`, otp, "EX", 300);

  await emailQueue.add("verify-email", {
    email: user.email,
    otp,
  });

  const token = createAuthToken(user);

  return {
    user: sanitizeUser(user),

    token,
    message: "OTP sent to email",
  };
};

export const verifyEmail = async ({ email, otp }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Email already verified");
  }

  // Get OTP from Redis

  const savedOtp = await redis.get(`verify:${email}`);

  if (!savedOtp) {
    throw new ApiError(400, "OTP expired");
  }

  if (savedOtp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  // Update user

  const updatedUser = await verifyUserEmail(email);

  // Remove used OTP

  await redis.del(`verify:${email}`);

  return {
    message: "Email verified successfully",
  };
};

export const resendOtp = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Email already verified");
  }

  const otp = generateOTP();

  // Replace old OTP

  await redis.set(`verify:${email}`, otp, "EX", 300);

  // Send email using queue

  await emailQueue.add("verify-email", {
    email: user.email,
    otp,
  });

  return {
    message: "OTP resent successfully",
  };
};

//login

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await findUserByEmails(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check email verification

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  // Compare password

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Create JWT

  const token = createAuthToken(user);

  const refreshToken = createRefreshToken(user);

  // offed by limit redis

  await redis.set(`refresh:${user._id}`, refreshToken, "EX", 60 * 60 * 24 * 7);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: sanitizeUser(user),
    token,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  console.log(refreshAccessToken, "refershAccessToken");
  
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const storedToken = await redis.get(`refresh:${decoded.id}`);


  if (!storedToken) {
    throw new ApiError(401, "Refresh token expired");
  }

  // Check token belongs to user

  if (storedToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await findUserById(decoded.id);
  
  const token = generateToken(user);

  return {
    token,
  };
};
