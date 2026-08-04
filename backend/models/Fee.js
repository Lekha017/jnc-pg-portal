import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    year: {
      type: String,
      required: true,
      enum: [
        "I Year",
        "II Year",
      ],
    },

    insideKarnatakaFee: {
      type: Number,
      required: true,
      min: 0,
    },

    outsideKarnatakaFee: {
      type: Number,
      required: true,
      min: 0,
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

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;