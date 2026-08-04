import mongoose from "mongoose";

const programDetailsSchema = new mongoose.Schema(
    {
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
            unique: true,
        },

        degreeTitle: {
            type: String,
            required: true,
            trim: true,
        },

        departmentName: {
            type: String,
            trim: true,
        },

        heroImage: {
            type: String,
            default: "",
        },

        applyLink: {
            type: String,
            default: "",
        },

        contactPerson1: {
            type: String,
            trim: true,
        },

        contactPhone1: {
            type: String,
            trim: true,
        },

        contactPerson2: {
            type: String,
            trim: true,
        },

        contactPhone2: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        /* Tabs */

        eligibility: {
            type: String,
            default: "",
        },

        programmeDetails: {
            type: String,
            default: "",
        },

        selectionProcess: {
            type: String,
            default: "",
        },


        programmeObjectives: {
            type: String,
            default: "",
        },

        programmeOutcomes: {
            type: String,
            default: "",
        },

        potentialCareerOptions: {
            type: String,
            default: "",
        },

        syllabus: {
            type: String,
            default: "",
        },

        syllabusPdf: {
            type: String,
            default: "",
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

export default mongoose.model(
    "ProgramDetails",
    programDetailsSchema
);