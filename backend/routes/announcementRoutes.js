import express from "express";

import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  getAnnouncementsByCategory,
  getAnnouncementsByDepartment,
  updateAnnouncement,
  deleteAnnouncement,
  togglePublishStatus,
} from "../controllers/announcementController.js";

import { protect } from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAnnouncements);
router.get("/category/:category", getAnnouncementsByCategory);
router.get("/department/:departmentId", getAnnouncementsByDepartment);
router.get("/:id", getAnnouncementById);

// Admin Routes
router.post("/", protect, authorize("admin"), createAnnouncement);

router.put("/:id", protect, authorize("admin"), updateAnnouncement);

router.delete("/:id", protect, authorize("admin"), deleteAnnouncement);

router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

export default router;