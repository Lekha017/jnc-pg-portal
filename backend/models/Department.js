import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    about: {
      type: String,
      required: true,
      trim: true,
    },

    vision: {
      type: String,
      default: "",
      trim: true,
    },

    mission: {
      type: String,
      default: "",
      trim: true,
    },

    hod: {
      type: String,
      default: "",
      trim: true,
    },

    hodMessage: {
      type: String,
      default: "",
      trim: true,
    },

    programmes: [
      {
        type: String,
        trim: true,
      },
    ],

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "", // Department Image (Cloudinary)
    },

    bannerImage: {
      type: String,
      default: "", // Banner Image (Cloudinary)
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

export default mongoose.model("Department", departmentSchema);