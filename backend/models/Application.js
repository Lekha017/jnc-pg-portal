import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    documents: {
      type: [String], // Cloudinary URLs later
      default: [],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);