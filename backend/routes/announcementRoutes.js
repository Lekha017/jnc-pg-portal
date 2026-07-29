import express from "express";

import {
  createAnnouncement,
  getAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  getAnnouncementsByCategory,
  getAnnouncementsByDepartment,
  updateAnnouncement,
  deleteAnnouncement,
  togglePublishStatus,
} from "../controllers/announcementController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Get Published Announcements
router.get("/", getAnnouncements);

// Get Announcements By Category
router.get("/category/:category", getAnnouncementsByCategory);

// Get Announcements By Department
router.get("/department/:departmentId", getAnnouncementsByDepartment);

// Get Single Announcement
router.get("/:id", getAnnouncementById);

/* ===========================
   Admin Routes
=========================== */

// Get All Announcements (Published + Draft)
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllAnnouncements
);

// Create Announcement
router.post(
  "/",
  protect,
  authorize("admin"),
  createAnnouncement
);

// Update Announcement
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateAnnouncement
);

// Delete Announcement
router.delete(
  "/:id",
  protect,
 authorize("admin"),
  deleteAnnouncement
);

// Publish / Unpublish Announcement
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

export default router;