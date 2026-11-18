import { Worker } from "bullmq";
import redis from "../infrastructure/cache/redis.cache.js";
import { sendEmail } from "../infrastructure/email/email.provider.js";

const emailWorker = new Worker(
  "email",

  async (job) => {
    if (job.name === "verify-email") {
      await sendEmail({
        to: job.data.email,

        subject: "Verify Account",

        message: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #4F46E5;">Welcome! Verify Your Account</h2>
                        <p>Thank you for signing up. Please use the One-Time Password (OTP) below to verify your email address:</p>
                        <div style="background: #F3F4F6; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 20px 0; border-radius: 5px;">
                            ${job.data.otp}
                        </div>
                        <p style="color: #666; font-size: 14px;">This OTP is valid for a limited time. If you didn't request this, please ignore this email.</p>
                    </div>`,
      });
    }
  },

  {
    connection: redis,
    drainDelay: 30,
    stalledInterval: 300000,
  },
);

export default emailWorker;
