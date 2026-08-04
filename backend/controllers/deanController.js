import Dean from "../models/Dean.js";

// Get all deans
export const getAllDeans = async (req, res) => {
  try {
    const deans = await Dean.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: deans,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch deans.",
    });
  }
};

// Get single dean
export const getDeanById = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);

    if (!dean) {
      return res.status(404).json({
        success: false,
        message: "Dean not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: dean,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dean.",
    });
  }
};

// Add dean
export const addDean = async (req, res) => {
  try {
    const dean = await Dean.create({
      name: req.body.name,
      qualification: req.body.qualification,
      designation: req.body.designation,
      order: req.body.order || 0,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Dean added successfully.",
      data: dean,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add dean.",
    });
  }
};

// Update dean
export const updateDean = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);

    if (!dean) {
      return res.status(404).json({
        success: false,
        message: "Dean not found.",
      });
    }

    if (req.file) {
      dean.image = req.file.path;
    }

    dean.name = req.body.name ?? dean.name;
    dean.qualification = req.body.qualification ?? dean.qualification;
    dean.designation = req.body.designation ?? dean.designation;
    dean.order = req.body.order ?? dean.order;

    await dean.save();

    res.status(200).json({
      success: true,
      message: "Dean updated successfully.",
      data: dean,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update dean.",
    });
  }
};

// Delete dean
export const deleteDean = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);

    if (!dean) {
      return res.status(404).json({
        success: false,
        message: "Dean not found.",
      });
    }

    await dean.deleteOne();

    res.status(200).json({
      success: true,
      message: "Dean deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete dean.",
    });
  }
};