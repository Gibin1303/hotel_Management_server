import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Related booking
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    // Customer who made payment
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Payment gateway
    gateway: {
      type: String,
      enum: ["RAZORPAY", "STRIPE"],
      default: "RAZORPAY",
    },

    // Gateway order id (Razorpay order_id / Stripe payment intent)
    orderId: {
      type: String,
      default: null,
    },

    // Gateway transaction id
    transactionId: {
      type: String,
      default: null,
    },

    // Payment amount
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Payment status
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    // Failure details
    failureReason: {
      type: String,
      default: null,
    },

    // Refund details
    refundAmount: {
      type: Number,
      default: 0,
    },

    refundedAt: {
      type: Date,
      default: null,
    },

    // Successful payment time
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Payment", paymentSchema);
