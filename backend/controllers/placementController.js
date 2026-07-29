import Placement from "../models/Placement.js";

// ============================
// Create Placement
// ============================
export const createPlacement = async (req, res) => {
  try {
    const placement = await Placement.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Placement created successfully",
      data: placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Public - Published Placements
// ============================
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find({
      isPublished: true,
    })
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ placementDate: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      data: placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Admin - All Placements
// ============================
export const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find({})
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ placementDate: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      data: placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Placement By ID
// ============================
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id)
      .populate("department", "name code")
      .populate("createdBy", "fullName email");

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Department Filter
// ============================
export const getPlacementsByDepartment = async (req, res) => {
  try {
    const placements = await Placement.find({
      department: req.params.departmentId,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ placementDate: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      data: placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Year Filter
// ============================
export const getPlacementsByYear = async (req, res) => {
  try {
    const placements = await Placement.find({
      year: req.params.year,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ placementDate: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      data: placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Update Placement
// ============================
export const updatePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Placement updated successfully",
      data: placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Delete Placement
// ============================
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    await placement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Placement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Publish / Unpublish
// ============================
export const togglePublishStatus = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }

    placement.isPublished = !placement.isPublished;

    await placement.save();

    res.status(200).json({
      success: true,
      message: `Placement ${
        placement.isPublished ? "Published" : "Unpublished"
      } successfully`,
      data: placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};