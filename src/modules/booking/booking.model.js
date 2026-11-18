import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Customer who booked
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Hotel reference
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    // Selected room reference
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    // Stay dates
    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    // Number of guests
    guests: {
      adults: {
        type: Number,
        required: true,
        min: 1,
      },

      children: {
        type: Number,
        default: 0,
      },
    },

    // Number of rooms booked
    roomsBooked: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Price snapshot at booking time
    priceDetails: {
      pricePerNight: {
        type: Number,
        required: true,
      },

      totalNights: {
        type: Number,
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
      },

      platformFee: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },
    },

    // Booking status
    bookingStatus: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },

    // Payment status
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    // Razorpay payment id
    paymentId: {
      type: String,
      default: null,
    },

    // Unique booking number
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
    },

    cancellation: {
      cancelledAt: {
        type: Date,
      },

      reason: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", bookingSchema);
