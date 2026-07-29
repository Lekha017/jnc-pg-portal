import express from "express";
import upload from "../middleware/upload.js";

import {
  createPlacementContact,
  getPlacementContact,
  getPlacementContacts,
  updatePlacementContact,
  deletePlacementContact,
} from "../controllers/placementContactController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ============================
// Public Route
// ============================
router.get("/", getPlacementContact);

// ============================
// Admin Routes
// ============================
router.get(
  "/admin",
  protect,
  authorize("admin"),
  getPlacementContacts
);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("profileImage"),
  createPlacementContact
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("profileImage"),
  updatePlacementContact
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePlacementContact
);

export default router;