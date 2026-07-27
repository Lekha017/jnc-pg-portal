import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },

    researchArea: {
      type: String,
      required: true,
      trim: true,
    },

    journal: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    doi: {
      type: String,
      default: "",
      trim: true,
    },

    authors: {
      type: String,
      required: true,
      trim: true,
    },

    keywords: {
      type: String,
      default: "",
      trim: true,
    },

    pdf: {
      url: {
        type: String,
        default: "https://placehold.co/600x800?text=Research+PDF",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    image: {
      url: {
        type: String,
        default: "https://placehold.co/800x600?text=Research",
      },
      public_id: {
        type: String,
        default: "",
      },
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

export default mongoose.model("Research", researchSchema);