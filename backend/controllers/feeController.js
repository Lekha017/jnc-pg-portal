import Fee from "../models/Fee.js";

/* ============================
   CREATE FEE
============================ */

export const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fee created successfully.",
      data: fee,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create fee.",
    });
  }
};

/* ============================
   GET ALL FEES (ADMIN)
============================ */

export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("program", "programName category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: fees,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch fees.",
    });
  }
};

/* ============================
   GET FEE BY PROGRAM (PUBLIC)
============================ */

export const getFeeByProgram = async (req, res) => {
  try {
    const fee = await Fee.find({
      program: req.params.programId,
      isActive: true,
    }).populate("program", "programName");

    res.status(200).json({
      success: true,
      data: fee,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch fee.",
    });
  }
};

/* ============================
   UPDATE FEE
============================ */

export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee updated successfully.",
      data: fee,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update fee.",
    });
  }
};

/* ============================
   DELETE FEE
============================ */

export const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete fee.",
    });
  }
};