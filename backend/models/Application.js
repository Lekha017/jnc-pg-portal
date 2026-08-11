import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // Logged-in applicant
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Application Number
    applicationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    // =========================
    // Step 1 — Personal Details
    // =========================

    applicantName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    nationality: {
      type: String,
      required: true,
      trim: true,
      default: "Indian",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      default: "",
      trim: true,
    },

    aadhaarNumber: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // Step 2 — Address Details
    // =========================

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      default: "India",
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // =========================
    // Step 3 — Academic Details
    // =========================

    tenthSchool: {
      type: String,
      required: true,
      trim: true,
    },

    tenthBoard: {
      type: String,
      required: true,
      trim: true,
    },

    tenthYear: {
      type: Number,
      required: true,
    },

    tenthPercentage: {
      type: String,
      required: true,
      trim: true,
    },

    twelfthCollege: {
      type: String,
      required: true,
      trim: true,
    },

    twelfthBoard: {
      type: String,
      required: true,
      trim: true,
    },

    twelfthYear: {
      type: Number,
      required: true,
    },

    twelfthPercentage: {
      type: String,
      required: true,
      trim: true,
    },

    bachelorDegree: {
      type: String,
      required: true,
      trim: true,
    },

    bachelorUniversity: {
      type: String,
      required: true,
      trim: true,
    },

    bachelorYear: {
      type: Number,
      required: true,
    },

    bachelorPercentage: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // Step 4 — Programme
    // =========================

    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    // =========================
    // Step 5 — Documents
    // =========================

    documents: {
      photograph: {
        type: String,
        default: "",
      },

      aadhaarDocument: {
        type: String,
        default: "",
      },

      tenthMarksheet: {
        type: String,
        default: "",
      },

      twelfthMarksheet: {
        type: String,
        default: "",
      },

      degreeCertificate: {
        type: String,
        default: "",
      },

      degreeMarksheets: {
        type: String,
        default: "",
      },

      transferCertificate: {
        type: String,
        default: "",
      },

      migrationCertificate: {
        type: String,
        default: "",
      },
    },

    // =========================
    // Step 6 — Declaration
    // =========================

    declarationAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },

    // =========================
    // Payment
    // =========================

    applicationFee: {
      type: Number,
      default: 500,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    // =========================
    // Application Status
    // =========================

    status: {
      type: String,
      enum: [
        "Draft",
        "Pending Payment",
        "Submitted",
        "Under Review",
        "Approved",
        "Rejected",
      ],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", applicationSchema);