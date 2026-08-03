import mongoose from "mongoose";

const placementGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    eventDate: {
      type: Date,
      required: true,
    },

    images: [
      {
        public_id: String,
        url: String,
      },
    ],

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
  "PlacementGallery",
  placementGallerySchema
);