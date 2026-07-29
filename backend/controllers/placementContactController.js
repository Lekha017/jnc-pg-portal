import PlacementContact from "../models/PlacementContact.js";

// ============================================
// Create Placement Contact
// ============================================
export const createPlacementContact = async (req, res) => {
  try {
    let profileImage = {
      url: "https://placehold.co/400x400?text=Coordinator",
      public_id: "",
    };

    // Upload Profile Image
    if (req.file) {
      profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const contact = await PlacementContact.create({
      coordinatorName: req.body.coordinatorName,
      designation: req.body.designation,
      department: req.body.department,
      email: req.body.email,
      phone: req.body.phone,
      description: req.body.description,

      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,

      profileImage,

      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Placement contact created successfully.",
      data: contact,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Get Published Contact (Public)
// ============================================
export const getPlacementContact = async (req, res) => {
  try {
    const contact = await PlacementContact.findOne({
      isPublished: true,
    }).populate("createdBy", "fullName");

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Get All Contacts (Admin)
// ============================================
export const getPlacementContacts = async (req, res) => {
  try {
    const contacts = await PlacementContact.find()
      .populate("createdBy", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Update Placement Contact
// ============================================
export const updatePlacementContact = async (req, res) => {
  try {
    const contact = await PlacementContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Placement contact not found.",
      });
    }

    contact.coordinatorName =
      req.body.coordinatorName || contact.coordinatorName;

    contact.designation =
      req.body.designation || contact.designation;

    contact.department =
      req.body.department || contact.department;

    contact.email =
      req.body.email || contact.email;

    contact.phone =
      req.body.phone || contact.phone;

    contact.description =
      req.body.description || contact.description;

    contact.isPublished =
      req.body.isPublished === "true" ||
      req.body.isPublished === true;

    if (req.file) {
      contact.profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Placement contact updated successfully.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Delete Placement Contact
// ============================================
export const deletePlacementContact = async (req, res) => {
  try {
    const contact = await PlacementContact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Placement contact not found.",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Placement contact deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};