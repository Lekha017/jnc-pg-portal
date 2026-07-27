import Announcement from "../models/Announcement.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      isPublished: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } },
      ],
    })
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ important: -1, publishDate: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Announcement By ID
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate("department", "name code")
      .populate("createdBy", "fullName email");

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Category
export const getAnnouncementsByCategory = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      category: req.params.category,
      isPublished: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } },
      ],
    })
      .populate("department", "name code")
      .sort({ important: -1, publishDate: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Department
export const getAnnouncementsByDepartment = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      department: req.params.departmentId,
      isPublished: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } },
      ],
    })
      .populate("department", "name code")
      .sort({ important: -1, publishDate: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
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
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    announcement.isPublished = !announcement.isPublished;

    await announcement.save();

    res.status(200).json({
      success: true,
      message: `Announcement ${
        announcement.isPublished ? "Published" : "Unpublished"
      } successfully`,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};