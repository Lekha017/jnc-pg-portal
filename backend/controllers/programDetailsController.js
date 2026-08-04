import ProgramDetails from "../models/programDetailsModel.js";

/* ==========================
   CREATE PROGRAM DETAILS
========================== */

export const createProgramDetails = async (
    req,
    res
) => {
    try {

        const existing =
            await ProgramDetails.findOne({
                program: req.body.program,
            });

        if (existing) {
            return res.status(400).json({
                success: false,
                message:
                    "Details already exist for this program.",
            });
        }

        const data = {
            ...req.body,
        };

        if (req.file) {
            data.syllabusPdf = req.file.path;
        }

        const details =
            await ProgramDetails.create(data);

        res.status(201).json({
            success: true,
            message:
                "Program details created successfully.",
            data: details,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

/* ==========================
   GET ALL PROGRAM DETAILS
========================== */

export const getProgramDetails = async (
    req,
    res
) => {
    try {

        const details =
            await ProgramDetails.find()
                .populate(
                    "program",
                    "programName category"
                )
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            success: true,
            data: details,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

/* ==========================
   GET SINGLE DETAILS
========================== */

export const getProgramDetailsById =
    async (req, res) => {
        try {

            const details =
                await ProgramDetails.findById(
                    req.params.id
                ).populate(
                    "program",
                    "programName category"
                );

            if (!details) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Program details not found.",
                });
            }

            res.status(200).json({
                success: true,
                data: details,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    };

/* ==========================
   GET DETAILS BY PROGRAM
========================== */

export const getDetailsByProgram =
    async (req, res) => {
        try {

            const details =
                await ProgramDetails.findOne({
                    program:
                        req.params.programId,
                }).populate(
                    "program",
                    "programName category"
                );

            if (!details) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Program details not found.",
                });
            }

            res.status(200).json({
                success: true,
                data: details,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    };

/* ==========================
   UPDATE PROGRAM DETAILS
========================== */

export const updateProgramDetails =
    async (req, res) => {
        try {

            const data = {
                ...req.body,
            };

            if (req.files?.syllabusPdf?.[0]) {
                data.syllabusPdf =
                    req.files.syllabusPdf[0].path;
            }

            const details =
                await ProgramDetails.findByIdAndUpdate(
                    req.params.id,
                    data,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            if (!details) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Program details not found.",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Program details updated successfully.",
                data: details,
            });

        } catch (error) {

            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Details already exist for this program.",
                });
            }

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    };

/* ==========================
   DELETE PROGRAM DETAILS
========================== */

export const deleteProgramDetails =
    async (req, res) => {
        try {

            const details =
                await ProgramDetails.findByIdAndDelete(
                    req.params.id
                );

            if (!details) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Program details not found.",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Program details deleted successfully.",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    };