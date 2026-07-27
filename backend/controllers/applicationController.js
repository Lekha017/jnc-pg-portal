import Application from "../models/Application.js";

// Apply
export const submitApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Application
export const getMyApplication = async (req, res) => {
  try {
    const application = await Application.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Application
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    Object.assign(application, req.body);

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated.",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};