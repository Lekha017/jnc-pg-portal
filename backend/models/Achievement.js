import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
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

    type: {
      type: String,
      required: true,
      enum: ["student", "faculty"],
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Date is OPTIONAL
    date: {
      type: Date,
      required: false,
    },

    // At least ONE image is mandatory
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
            trim: true,
          },

          public_id: {
            type: String,
            default: "",
          },
        },
      ],
      required: [true, "At least one achievement image is required."],
      validate: {
        validator: function (images) {
          return Array.isArray(images) && images.length > 0;
        },
        message: "At least one achievement image is required.",
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

export default mongoose.model("Achievement", achievementSchema);