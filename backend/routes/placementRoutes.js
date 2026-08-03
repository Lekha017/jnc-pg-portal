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
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getPlacements);

router.get(
  "/department/:departmentId",
  getPlacementsByDepartment
);

router.get(
  "/year/:year",
  getPlacementsByYear
);

/* ===========================
   Admin Routes
=========================== */

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllPlacements
);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.fields([
    {
      name: "studentPhoto",
      maxCount: 1,
    },
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  createPlacement
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.fields([
    {
      name: "studentPhoto",
      maxCount: 1,
    },
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  updatePlacement
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePlacement
);

router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

/* ===========================
   Single Placement
=========================== */

router.get("/:id", getPlacementById);

export default router;