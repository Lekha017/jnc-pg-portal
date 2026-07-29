import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    usn: {
      type: String,
      trim: true,
      default: "",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    package: {
      type: Number,
      required: true,
      min: 0,
    },

    placementDate: {
      type: Date,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    studentPhoto: {
      url: {
        type: String,
        default:
          "https://placehold.co/400x400?text=Student",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    companyLogo: {
      url: {
        type: String,
        default:
          "https://placehold.co/400x200?text=Company",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    testimonial: {
      type: String,
      trim: true,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Placement", placementSchema);