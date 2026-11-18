import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./api/v1/auth.route.js";
import adminRoute from "./api/v1/admin.routes.js";
import ownerRoute from "./api/v1/ownerRoute.js";
import customerRoute from "./api/v1/customer.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// middleware

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "https://hotel-booking-neon-beta.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// Rotes
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/admin", adminRoute);

app.use("/api/v1/owner", ownerRoute);

app.use("/api/v1/customer", customerRoute);

// test route

app.get("/", (req, res) => {
  res.json({
    message: "Hotel Booking API Running",
  });
});

app.use(errorMiddleware);

export default app;
