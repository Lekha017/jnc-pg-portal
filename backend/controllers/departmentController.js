import Department from "../models/Department.js";
import Faculty from "../models/Faculty.js";
// =======================
// CREATE DEPARTMENT
// =======================
export const createDepartment = async (req, res) => {
  try {
    const {
      name,
      slug,
      about,
      vision,
      mission,
      hod,
      hodMessage,
      programmes,
    } = req.body;

    const existingDepartment = await Department.findOne({
  isActive: true,
  $or: [
    { name },
    { slug },
  ],
});

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    const department = await Department.create({
      name,
      slug,
      about,
      vision,
      mission,
      hod,
      hodMessage,
      programmes,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });
  }catch (error) {
  console.error("Create Department Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// =======================
// GET ALL DEPARTMENTS
// =======================
export const getDepartments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {
      isActive: true,
    };

    const totalDepartments = await Department.countDocuments(filter);

    const departments = await Department.find(filter)
      .populate("hod", "fullName")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: departments.length,
      totalDepartments,
      currentPage: page,
      totalPages: Math.ceil(totalDepartments / limit),
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GET DEPARTMENT BY ID
// =======================

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate("hod");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GET DEPARTMENT BY SLUG
// =======================

export const getDepartmentBySlug = async (req, res) => {
  try {
    const department = await Department.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate("hod");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const faculty = await Faculty.find({
      departments: department._id,
    }).populate("departments", "name");

    res.status(200).json({
      success: true,
      data: {
        ...department.toObject(),
        faculty,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// UPDATE DEPARTMENT
// =======================
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// DELETE DEPARTMENT
// (SOFT DELETE)
// =======================
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
