import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    // Owner who created this hotel
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      country: {
        type: String,
        default: "India",
        trim: true,
      },
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    amenities: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "BLOCKED"],
      default: "PENDING",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

hotelSchema.index({ ownerId: 1, isDeleted: 1, createdAt: -1 });

export default mongoose.model("Hotel", hotelSchema);
