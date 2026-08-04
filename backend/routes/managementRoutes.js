import express from "express";

import {
  getAllManagement,
  getManagementById,
  addManagement,
  updateManagement,
  deleteManagement,
} from "../controllers/managementController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   PUBLIC ROUTES
=========================== */

router.get("/", getAllManagement);

router.get("/:id", getManagementById);

/* ===========================
   ADMIN ROUTES
=========================== */

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  addManagement
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateManagement
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteManagement
);

export default router;