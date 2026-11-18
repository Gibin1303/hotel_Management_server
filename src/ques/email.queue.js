import { Queue } from "bullmq";
import redis from "../infrastructure/cache/redis.cache.js";

export const emailQueue = new Queue("email", {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: true, // Deletes job from Redis immediately after success
    removeOnFail: 50, // Keeps only the last 50 failed jobs for debugging
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});
