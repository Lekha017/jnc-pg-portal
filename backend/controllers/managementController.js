import Management from "../models/Management.js";


// Get all members
export const getAllManagement = async (req, res) => {
  try {
    const members = await Management.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch management members.",
    });
  }
};

// Get single member
export const getManagementById = async (req, res) => {
  try {
    const member = await Management.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Management member not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch management member.",
    });
  }
};

// Add member
export const addManagement = async (req, res) => {
  try {
   const member = await Management.create({
  name: req.body.name,
  designation: req.body.designation,
  order: req.body.order || 0,
  image: req.file ? req.file.path : "",
});

    res.status(201).json({
      success: true,
      message: "Management member added successfully.",
      data: member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add management member.",
    });
  }
};

// Update member
export const updateManagement = async (req, res) => {
  try {
    const member = await Management.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Management member not found.",
      });
    }

   if (req.file) {
  member.image = req.file.path;
}

    member.name = req.body.name ?? member.name;
    member.designation = req.body.designation ?? member.designation;
    member.order = req.body.order ?? member.order;

    await member.save();

    res.status(200).json({
      success: true,
      message: "Management member updated successfully.",
      data: member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update management member.",
    });
  }
};

// Delete member
export const deleteManagement = async (req, res) => {
  try {
    const member = await Management.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Management member not found.",
      });
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      message: "Management member deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete management member.",
    });
  }
};