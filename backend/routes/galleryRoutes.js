import express from "express";

import {
  createGallery,
  getGalleries,
  getGalleryById,
  getGalleryByCategory,
  getGalleryByDepartment,
  updateGallery,
  deleteGallery,
  togglePublishStatus,
} from "../controllers/galleryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Get All Galleries
router.get("/", getGalleries);

// Get Galleries By Category
router.get("/category/:category", getGalleryByCategory);

// Get Galleries By Department
router.get("/department/:departmentId", getGalleryByDepartment);

// Get Gallery By ID
router.get("/:id", getGalleryById);

/* ===========================
   Admin Routes
=========================== */

// Create Gallery
router.post("/", protect, authorize("admin"), createGallery);

// Update Gallery
router.put("/:id", protect, authorize("admin"), updateGallery);

// Delete Gallery
router.delete("/:id", protect, authorize("admin"), deleteGallery);

// Publish / Unpublish Gallery
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

export default router;