import express from "express";

import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getMyProfile,
  updateMyProfile,
  getFacultyDropdown,
} from "../controllers/facultyController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* =====================================================
   PUBLIC ROUTES
===================================================== */

// Get all faculty
router.get("/", getAllFaculty);

// Faculty dropdown
router.get("/dropdown", getFacultyDropdown);

/* =====================================================
   FACULTY ROUTES
===================================================== */

// Get logged-in faculty profile
router.get(
  "/me/profile",
  protect,
  authorize("faculty"),
  getMyProfile
);

// Update logged-in faculty profile
router.put(
  "/me/profile",
  protect,
  authorize("faculty"),
  upload.single("image"),
  updateMyProfile
);

/* =====================================================
   PUBLIC ROUTES
===================================================== */

// Get faculty by ID
router.get("/:id", getFacultyById);

/* =====================================================
   ADMIN ROUTES
===================================================== */

// Create faculty
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createFaculty
);

// Update faculty
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateFaculty
);

// Delete faculty
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteFaculty
);

export default router;