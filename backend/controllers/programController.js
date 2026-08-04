import Program from "../models/Program.js";

/* ==========================
   CREATE PROGRAM
========================== */

export const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);

    res.status(201).json({
      success: true,
      message: "Program created successfully.",
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   GET ALL PROGRAMS
========================== */

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find()
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   GET SINGLE PROGRAM
========================== */

export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(
      req.params.id
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   UPDATE PROGRAM
========================== */

export const updateProgram = async (req, res) => {
  try {
    const program =
      await Program.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program updated successfully.",
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   DELETE PROGRAM
========================== */

export const deleteProgram = async (req, res) => {
  try {
    const program =
      await Program.findByIdAndDelete(
        req.params.id
      );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};