// import Redis from "ioredis";
// import dotenv from "dotenv";
// dotenv.config();

// let redis = null;
// let redisUrl;

// if (process.env.NODE_ENV === "development") {
//   redisUrl = process.env.REDIS_URL;
// } else {
//   redisUrl = process.env.REDIS_URL_PROD;
// }

// redis = new Redis(redisUrl, {
//   maxRetriesPerRequest: null,
//   // tls: {},
//   retryStrategy(times) {
//     // Wait up to 30 seconds between reconnection attempts
//     return Math.min(times * 2000, 30000);
//   },
// });

// redis.on("connect", () => {
//   console.log("Redis Connected");
// });

// redis.on("error", (error) => {
//   console.log("Redis Error:", error.message);
// });

// export default redis;

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis = null;

const redisUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REDIS_URL_PROD
    : process.env.REDIS_URL;

if (redisUrl) {
  const isTls = redisUrl.startsWith("rediss://");

  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    tls: isTls ? { rejectUnauthorized: false } : undefined,
    retryStrategy(times) {
      return Math.min(times * 2000, 30000);
    },

    retryStrategy(times) {
      return Math.min(times * 2000, 30000);
    },
  });

  redis.on("connect", () => {
    console.log("Redis Connected", redisUrl);
  });

  redis.on("error", (error) => {
    console.log("Redis Error:", error.message);
  });
} else {
  console.log("Redis disabled");
}

export default redis;
