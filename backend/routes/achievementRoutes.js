import express from "express";

import {
  createAchievement,
  getAchievements,
  getAllAchievements,
  getAchievementById,
  getAchievementsByType,
  getAchievementsByDepartment,
  updateAchievement,
  deleteAchievement,
  togglePublishStatus,
} from "../controllers/achievementController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Published Achievements
router.get("/", getAchievements);

// Achievements By Type
router.get("/type/:type", getAchievementsByType);

// Achievements By Department
router.get(
  "/department/:departmentId",
  getAchievementsByDepartment
);

/* ===========================
   Admin Routes
=========================== */

// Get All Achievements
// Published + Unpublished
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllAchievements
);

// Create Achievement
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images"),
  createAchievement
);

// Update Achievement
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images"),
  updateAchievement
);

// Delete Achievement
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteAchievement
);

// Publish / Unpublish
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

/* ===========================
   Single Achievement
=========================== */

// Keep this LAST
router.get("/:id", getAchievementById);

export default router;