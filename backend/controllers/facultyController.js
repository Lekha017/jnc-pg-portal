import Faculty from "../models/Faculty.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

import bcrypt from "bcryptjs";

/* =====================================================
   CREATE FACULTY (ADMIN)
===================================================== */
export const createFaculty = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      designation,
      departments,
      bio,
    } = req.body;

    // Required field validation
    if (
      !fullName ||
      !email ||
      !password ||
      !designation ||
      !departments
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Validate departments
    const departmentIds = Array.isArray(departments)
      ? departments
      : [departments];

    const validDepartments = await Department.find({
      _id: { $in: departmentIds },
    });

    if (validDepartments.length !== departmentIds.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid department selected.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create login user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role: "faculty",
    });

    // Create faculty profile
    const faculty = await Faculty.create({
      user: user._id,
      fullName,
      email,
      phone,
      designation,
      departments: departmentIds,
      bio,
      image: req.file ? req.file.path : "",
    });

    return res.status(201).json({
      success: true,
      message: "Faculty created successfully.",
      faculty,
    });
  } catch (error) {
    console.error("Create Faculty Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/* =====================================================
   GET ALL FACULTY (PUBLIC)
===================================================== */
export const getAllFaculty = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      search = "",
      department = "",
    } = req.query;

    const query = {};

    // Search by faculty name
    if (search) {
      query.fullName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by department
    if (department) {
      query.departments = department;
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);

    const totalFaculty = await Faculty.countDocuments(query);

    const faculty = await Faculty.find(query)
      .populate("departments", "name")
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      data: faculty,
      currentPage,
      totalPages: Math.ceil(totalFaculty / pageSize),
      totalFaculty,
    });
  } catch (error) {
    console.error("Get Faculty Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* =====================================================
   GET FACULTY BY ID
===================================================== */
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate("departments", "name")
      .populate("user", "fullName email phone");

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    return res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get Faculty By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/* =====================================================
   UPDATE FACULTY (ADMIN)
===================================================== */
export const updateFaculty = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      designation,
      departments,
      bio,
    } = req.body;

    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    // Update linked user
    if (faculty.user) {
      await User.findByIdAndUpdate(faculty.user, {
        fullName,
        email,
        phone,
      });
    }

    faculty.fullName = fullName;
    faculty.email = email;
    faculty.phone = phone;
    faculty.designation = designation;
    faculty.bio = bio;

    faculty.departments = Array.isArray(departments)
      ? departments
      : [departments];

    if (req.file) {
      faculty.image = req.file.path;
    }

    await faculty.save();

    const updatedFaculty = await Faculty.findById(faculty._id)
      .populate("departments", "name");

    return res.status(200).json({
      success: true,
      message: "Faculty updated successfully.",
      data: updatedFaculty,
    });

  } catch (error) {
    console.error("Update Faculty Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* =====================================================
   DELETE FACULTY (ADMIN)
===================================================== */
export const deleteFaculty = async (req, res) => {
  try {

    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    // Delete login account
    if (faculty.user) {
      await User.findByIdAndDelete(faculty.user);
    }

    // Delete faculty profile
    await Faculty.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Faculty deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Faculty Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/* =====================================================
   GET MY PROFILE (FACULTY)
===================================================== */
export const getMyProfile = async (req, res) => {
  try {

    const faculty = await Faculty.findOne({
      user: req.user._id,
    })
      .populate("departments", "name")
      .populate("user", "fullName email phone");

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: faculty,
    });

  } catch (error) {
    console.error("Get My Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* =====================================================
   UPDATE MY PROFILE (FACULTY)
===================================================== */
export const updateMyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      user: req.user._id,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    /* -----------------------------------------
       Basic Information
    ----------------------------------------- */

    faculty.fullName =
      req.body.fullName || faculty.fullName;

    faculty.email =
      req.body.email || faculty.email;

    faculty.phone =
      req.body.phone || faculty.phone;

    faculty.designation =
      req.body.designation ||
      faculty.designation;

    faculty.bio =
      req.body.bio || faculty.bio;

    faculty.academicExperience =
      req.body.academicExperience ||
      faculty.academicExperience;

    faculty.researchExperience =
      req.body.researchExperience ||
      faculty.researchExperience;

    if (req.body.researchInterests) {
  faculty.researchInterests = JSON.parse(
    req.body.researchInterests
  );
}

    if (req.body.departments) {
      faculty.departments = Array.isArray(
        req.body.departments
      )
        ? req.body.departments
        : [req.body.departments];
    }

    /* -----------------------------------------
       Structured Data
    ----------------------------------------- */

    if (req.body.qualifications) {
      faculty.qualifications = JSON.parse(
        req.body.qualifications
      );
    }

    if (req.body.structuredPublications) {
      faculty.structuredPublications =
        JSON.parse(
          req.body.structuredPublications
        );
    }

    if (
      req.body
        .structuredConferencePublications
    ) {
      faculty.structuredConferencePublications =
        JSON.parse(
          req.body
            .structuredConferencePublications
        );
    }

    if (
      req.body.structuredPapersPresented
    ) {
      faculty.structuredPapersPresented =
        JSON.parse(
          req.body
            .structuredPapersPresented
        );
    }

    if (req.body.structuredAwards) {
      faculty.structuredAwards =
        JSON.parse(
          req.body.structuredAwards
        );
    }

    if (req.body.structuredMemberships) {
      faculty.structuredMemberships =
        JSON.parse(
          req.body
            .structuredMemberships
        );
    }

    /* -----------------------------------------
       Image
    ----------------------------------------- */

    if (req.file) {
      faculty.image = req.file.path;
    }

    /* -----------------------------------------
       Update User Account
    ----------------------------------------- */

    if (faculty.user) {
      await User.findByIdAndUpdate(
        faculty.user,
        {
          fullName: faculty.fullName,
          email: faculty.email,
          phone: faculty.phone,
        }
      );
    }

    await faculty.save();

    const updatedFaculty =
      await Faculty.findById(faculty._id)
        .populate("departments", "name")
        .populate(
          "user",
          "fullName email phone"
        );

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      data: updatedFaculty,
    });
  } catch (error) {
    console.error(
      "Update My Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};