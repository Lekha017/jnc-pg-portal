import express from "express";

import {
  createResearch,
  getResearch,
  getResearchById,
  getResearchByDepartment,
  getResearchByArea,
  getResearchByYear,
  updateResearch,
  deleteResearch,
  togglePublishStatus,
} from "../controllers/researchController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Get All Research
router.get("/", getResearch);

// Get Research By Department
router.get("/department/:departmentId", getResearchByDepartment);

// Get Research By Area
router.get("/area/:area", getResearchByArea);

// Get Research By Year
router.get("/year/:year", getResearchByYear);

// Get Research By ID
router.get("/:id", getResearchById);

/* ===========================
   Admin Routes
=========================== */

// Create
router.post("/", protect, authorize("admin"), createResearch);

// Update
router.put("/:id", protect, authorize("admin"), updateResearch);

// Delete
router.delete("/:id", protect, authorize("admin"), deleteResearch);

// Publish / Unpublish
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

export default router;