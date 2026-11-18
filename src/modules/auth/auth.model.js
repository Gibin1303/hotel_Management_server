import mongoose from "mongoose";
import { ROLES } from "../../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      // select:false
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
      index: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for admin filtering

userSchema.index({
  role: 1,
  status: 1,
});

const User = mongoose.model("User", userSchema);

export default User;
