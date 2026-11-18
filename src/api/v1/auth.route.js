import express from "express";

import {
  login,
  refreshTokenController,
  register,
  resendOtpController,
  verifyEmailController,
} from "../../modules/auth/auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  registerSchema,
  verifyEmailSchema,
} from "../../modules/auth/auth.validation.js";
import { refreshAccessToken } from "../../modules/auth/auth.service.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  verifyEmailController,
);

router.post("/resend-otp", resendOtpController);
router.post("/login", login);
router.post("/refresh-token", refreshTokenController);

export default router;
