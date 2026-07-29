import mongoose from "mongoose";

const eventGallerySchema = new mongoose.Schema(
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

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    coverImage: {
      url: {
        type: String,
        default: "https://placehold.co/1200x800?text=Gallery+Cover",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

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

export default mongoose.model("EventGallery", eventGallerySchema);