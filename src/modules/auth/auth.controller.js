import { registerUser, resendOtp, verifyEmail } from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { loginUser } from "./auth.service.js";
import { refreshAccessToken } from "./auth.service.js";
import ApiError from "../../utils/apiError.js";


export const register = asyncHandler(async (req, res) => {

  const result = await registerUser(req.body);
  console.log(result, "Registaration dtaa");
  
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  // res.status(201).json({
  //   success: true,

  //   data: result,
  // });
  res.status(201).json({
    success: true,
    data: {
      user: result.user,
      message: result.message,
    },
  });
});

export const verifyEmailController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const result = await verifyEmail({
    email,
    otp,
  });

  res.status(200).json({
    success: true,

    data: result,
  });
});

export const resendOtpController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await resendOtp(email);

  res.status(200).json({
    success: true,
    data: result,
  });
});

//login

export const login = asyncHandler(async (req, res) => {
  // const result = await loginUser(req.body);
    const {user,token,refreshToken} = await loginUser(req.body);


    //  res.cookie("refreshToken", result.refreshToken, {


  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,

    data: {
      // user: result.user,
      // token:result.token
      user,
      token
    },
  });
});






export const refreshTokenController = asyncHandler(
async (req, res) => {


    const refreshToken =
        req.cookies.refreshToken;



    if (!refreshToken) {

        throw new ApiError(
            401,
            "Refresh token missing"
        );

    }


    const result =
        await refreshAccessToken(refreshToken);



    res.status(200).json({

        success:true,

        data:result

    });


});