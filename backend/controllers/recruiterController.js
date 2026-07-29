import Recruiter from "../models/Recruiter.js";
import cloudinary from "../utils/cloudinary.js";


// ==========================
// CREATE RECRUITER
// ==========================
export const createRecruiter = async (req, res) => {
  try {
    const { isPublished } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required",
      });
    }

    const recruiter = await Recruiter.create({
      isPublished,
      logo: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    res.status(201).json({
      success: true,
      message: "Recruiter created successfully",
      data: recruiter,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create recruiter",
    });
  }
};


// ==========================
// GET ALL RECRUITERS
// ==========================
export const getRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: recruiters,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recruiters",
    });
  }
};


// ==========================
// GET PUBLISHED RECRUITERS
// ==========================
export const getPublishedRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({
      isPublished: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: recruiters,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recruiters",
    });
  }
};


// ==========================
// GET SINGLE RECRUITER
// ==========================
export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(
      req.params.id
    );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recruiter,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recruiter",
    });
  }
};


// ==========================
// UPDATE RECRUITER
// ==========================
export const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(
      req.params.id
    );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (req.file) {
      if (recruiter.logo?.public_id) {
        await cloudinary.uploader.destroy(
          recruiter.logo.public_id
        );
      }

      recruiter.logo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    recruiter.isPublished =
      req.body.isPublished;

    await recruiter.save();

    res.status(200).json({
      success: true,
      message: "Recruiter updated successfully",
      data: recruiter,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update recruiter",
    });
  }
};


// ==========================
// DELETE RECRUITER
// ==========================
export const deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(
      req.params.id
    );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.logo?.public_id) {
      await cloudinary.uploader.destroy(
        recruiter.logo.public_id
      );
    }

    await recruiter.deleteOne();

    res.status(200).json({
      success: true,
      message: "Recruiter deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete recruiter",
    });
  }
};