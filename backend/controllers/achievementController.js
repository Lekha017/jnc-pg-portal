import Achievement from "../models/Achievement.js";

// ==============================
// Create Achievement
// ==============================

export const createAchievement = async (req, res) => {
  try {
    const images = [];

    // ==============================
    // Multiple Cloudinary Images
    // ==============================

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: file.path,
          public_id: file.filename,
        });
      });
    }

    console.log("BODY:", req.body);

    if (req.files && req.files.length > 0) {
      console.log("FILES:", req.files);
    } else {
      console.log("NO FILES RECEIVED");
    }

    // ==============================
    // IMAGE IS MANDATORY
    // ==============================

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one achievement image is required.",
      });
    }

    // ==============================
    // Create Achievement
    // ==============================

    const achievement = await Achievement.create({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      department: req.body.department,
      category: req.body.category,

      // Date is optional
      date: req.body.date || undefined,

      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,

      images,
    });

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Create Achievement Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Published Achievements
// ==============================

export const getAchievements = async (req, res) => {
  try {
    const filter = {
      isPublished: true,
    };

    // Optional type filter
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // Optional department filter
    if (req.query.department) {
      filter.department = req.query.department;
    }

    const achievements = await Achievement.find(filter)
      .populate("department", "name code")
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error("Get Achievements Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Achievements
// Admin
// ==============================

export const getAllAchievements = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const type = req.query.type || "";
    const department = req.query.department || "";
    const category = req.query.category || "";

    const filter = {};

    // ==============================
    // Search by Title
    // ==============================

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // ==============================
    // Student / Faculty
    // ==============================

    if (type) {
      filter.type = type;
    }

    // ==============================
    // Department
    // ==============================

    if (department) {
      filter.department = department;
    }

    // ==============================
    // Category
    // ==============================

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    // ==============================
    // Count
    // ==============================

    const totalAchievements =
      await Achievement.countDocuments(filter);

    // ==============================
    // Fetch
    // ==============================

    const achievements = await Achievement.find(filter)
      .populate("department", "name code")
      .sort({ date: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: achievements.length,
      totalAchievements,
      currentPage: page,
      totalPages: Math.ceil(
        totalAchievements / limit
      ),
      data: achievements,
    });
  } catch (error) {
    console.error("Get All Achievements Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Achievement By ID
// ==============================

export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(
      req.params.id
    ).populate("department", "name code");

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    console.error(
      "Get Achievement By ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Achievements By Type
// ==============================

export const getAchievementsByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!["student", "faculty"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid achievement type",
      });
    }

    const achievements = await Achievement.find({
      type,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error(
      "Get Achievements By Type Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Achievements By Department
// ==============================

export const getAchievementsByDepartment = async (
  req,
  res
) => {
  try {
    const achievements = await Achievement.find({
      department: req.params.departmentId,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    console.error(
      "Get Achievements By Department Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Achievement
// ==============================

export const updateAchievement = async (req, res) => {
  try {
    // ==============================
    // Check Existing Achievement
    // ==============================

    const existingAchievement =
      await Achievement.findById(req.params.id);

    if (!existingAchievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    // ==============================
    // Basic Update Data
    // ==============================

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      department: req.body.department,
      category: req.body.category,

      // Date is optional
      date: req.body.date || undefined,

      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,
    };

    // ==============================
    // New Images Uploaded
    // ==============================

    if (req.files && req.files.length > 0) {
      const images = [];

      req.files.forEach((file) => {
        images.push({
          url: file.path,
          public_id: file.filename,
        });
      });

      updateData.images = images;
    } else {
      // ==============================
      // Keep Existing Images
      // ==============================

      updateData.images = existingAchievement.images;
    }

    // ==============================
    // Safety Check
    // ==============================

    if (
      !updateData.images ||
      updateData.images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one achievement image is required.",
      });
    }

    // ==============================
    // Update Achievement
    // ==============================

    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate("department", "name code");

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (error) {
    console.error(
      "Update Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Achievement
// ==============================

export const deleteAchievement = async (req, res) => {
  try {
    const achievement =
      await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    await achievement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Publish / Unpublish
// ==============================

export const togglePublishStatus = async (
  req,
  res
) => {
  try {
    const achievement =
      await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    achievement.isPublished =
      !achievement.isPublished;

    await achievement.save();

    res.status(200).json({
      success: true,
      message: `Achievement ${
        achievement.isPublished
          ? "Published"
          : "Unpublished"
      } successfully`,
      data: achievement,
    });
  } catch (error) {
    console.error(
      "Toggle Achievement Publish Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};