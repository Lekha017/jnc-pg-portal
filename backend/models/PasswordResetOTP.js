import mongoose from "mongoose";

const passwordResetOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Automatically deletes expired OTPs
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PasswordResetOTP",
  passwordResetOTPSchema
);