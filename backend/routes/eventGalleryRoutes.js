import express from "express";
import upload from "../middleware/upload.js";

import {
  createGallery,
  getGalleries,
  getAllGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/eventGalleryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ==========================
   Public Routes
========================== */

router.get("/", getGalleries);

router.get("/:id", getGalleryById);

/* ==========================
   Admin Routes
========================== */

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllGalleries
);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 30,
    },
  ]),
  createGallery
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 30,
    },
  ]),
  updateGallery
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteGallery
);

export default router;