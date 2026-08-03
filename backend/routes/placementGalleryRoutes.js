import express from "express";

import {
  getPlacementGalleries,
  getPlacementGallery,
  createPlacementGallery,
  updatePlacementGallery,
  deletePlacementGallery,
} from "../controllers/placementGalleryController.js";

import upload from "../middleware/upload.js";
// import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
        Public Routes
=========================== */

router.get("/", getPlacementGalleries);

router.get("/:id", getPlacementGallery);

/* ===========================
        Admin Routes
=========================== */

router.post(
  "/",
  // protect,
  // authorize("admin"),
  upload.array("images", 30),
  createPlacementGallery
);

router.put(
  "/:id",
  // protect,
  // authorize("admin"),
  upload.array("images", 30),
  updatePlacementGallery
);

router.delete(
  "/:id",
  // protect,
  // authorize("admin"),
  deletePlacementGallery
);

export default router;