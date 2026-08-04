import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    programName: {
      type: String,
      required: true,
      trim: true,
    },

    shortCode: {
      type: String,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Program", programSchema);