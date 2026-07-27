import Research from "../models/Research.js";

// Create Research
export const createResearch = async (req, res) => {
  try {
    const research = await Research.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Research created successfully",
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Research
export const getResearch = async (req, res) => {
  try {
    const research = await Research.find({ isPublished: true })
      .populate("department", "name code")
      .populate("faculty", "name designation")
      .populate("createdBy", "fullName")
      .sort({ year: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: research.length,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Research By ID
export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id)
      .populate("department", "name code")
      .populate("faculty", "name designation")
      .populate("createdBy", "fullName email");

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    res.status(200).json({
      success: true,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Research By Department
export const getResearchByDepartment = async (req, res) => {
  try {
    const research = await Research.find({
      department: req.params.departmentId,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: research.length,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Research By Area
export const getResearchByArea = async (req, res) => {
  try {
    const research = await Research.find({
      researchArea: req.params.area,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: research.length,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Research By Year
export const getResearchByYear = async (req, res) => {
  try {
    const research = await Research.find({
      year: req.params.year,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: research.length,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Research
export const updateResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Research updated successfully",
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Research
export const deleteResearch = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    await research.deleteOne();

    res.status(200).json({
      success: true,
      message: "Research deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Publish / Unpublish
export const togglePublishStatus = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Research not found",
      });
    }

    research.isPublished = !research.isPublished;

    await research.save();

    res.status(200).json({
      success: true,
      message: `Research ${
        research.isPublished ? "Published" : "Unpublished"
      } successfully`,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};