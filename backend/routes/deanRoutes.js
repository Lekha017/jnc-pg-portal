import express from "express";
import {
  getAllDeans,
  getDeanById,
  addDean,
  updateDean,
  deleteDean,
} from "../controllers/deanController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getAllDeans);
router.get("/:id", getDeanById);

/* ===========================
   Admin Routes
=========================== */

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  addDean
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateDean
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDean
);

export default router;