import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    university: {
      type: String,
      trim: true,
      default: "",
    },

    year: {
      type: Number,
    },
  },
  { _id: false }
);

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    journal: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    isbnIssn: {
      type: String,
      trim: true,
      default: "",
    },
    publisher: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const conferencePublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    conference: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const paperPresentedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    event: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
  },
  { _id: false }
);

const membershipSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: Number,
    },
  },
  { _id: false }
);

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
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

    phone: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    /* ================= QUALIFICATIONS ================= */

    qualifications: [qualificationSchema],

    /* ================= EXPERIENCE ================= */

    academicExperience: {
      type: String,
      default: "",
    },

    researchExperience: {
      type: String,
      default: "",
    },

    /* ================= RESEARCH ================= */

    researchInterests: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ================= PUBLICATIONS ================= */

    structuredPublications: [
      publicationSchema,
    ],

    structuredConferencePublications: [
      conferencePublicationSchema,
    ],

    structuredPapersPresented: [
      paperPresentedSchema,
    ],

    /* ================= AWARDS ================= */

    structuredAwards: [
      awardSchema,
    ],

    /* ================= MEMBERSHIPS ================= */

    structuredMemberships: [
      membershipSchema,
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Faculty",
  facultySchema
);