import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    logo: {
      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Recruiter",
  recruiterSchema
);