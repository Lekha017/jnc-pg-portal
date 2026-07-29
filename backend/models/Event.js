import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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

    venue: {
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

    chiefGuest: {
      type: String,
      default: "",
      trim: true,
    },

    registrationLink: {
      type: String,
      default: "",
      trim: true,
    },

    registrationQRCode: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    poster: {
      url: {
        type: String,
        default: "https://placehold.co/800x1000?text=Event+Poster",
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

export default mongoose.model("Event", eventSchema);