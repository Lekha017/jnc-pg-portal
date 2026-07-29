import express from "express";

import {
  createPlacement,
  getPlacements,
  getAllPlacements,
  getPlacementById,
  getPlacementsByDepartment,
  getPlacementsByYear,
  updatePlacement,
  deletePlacement,
  togglePublishStatus,
} from "../controllers/placementController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Published Placements Only
router.get("/", getPlacements);

// Filter By Department
router.get(
  "/department/:departmentId",
  getPlacementsByDepartment
);

// Filter By Year
router.get("/year/:year", getPlacementsByYear);

/* ===========================
   Admin Routes
=========================== */

// Get All Placements (Published + Draft)
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllPlacements
);

// Create Placement
router.post(
  "/",
  protect,
  authorize("admin"),
  createPlacement
);

// Update Placement
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updatePlacement
);

// Delete Placement
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePlacement
);

// Publish / Unpublish Placement
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

/* ===========================
   Single Placement
=========================== */

// Keep this LAST
router.get("/:id", getPlacementById);

export default router;