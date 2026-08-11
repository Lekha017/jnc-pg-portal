import mongoose from "mongoose";

const clubAssociationSchema = new mongoose.Schema(
  {
    // =========================================================
    // CLUB / ASSOCIATION NAME
    // =========================================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================================================
    // DESCRIPTION
    // =========================================================

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================================================
    // DEPARTMENT
    // =========================================================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // =========================================================
    // GALLERY IMAGES
    // =========================================================

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    // =========================================================
    // PUBLISH STATUS
    // =========================================================

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClubAssociation = mongoose.model(
  "ClubAssociation",
  clubAssociationSchema
);

export default ClubAssociation;