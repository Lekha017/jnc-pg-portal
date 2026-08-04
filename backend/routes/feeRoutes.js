import express from "express";

import {
  createFee,
  getFees,
  getFeeByProgram,
  updateFee,
  deleteFee,
} from "../controllers/feeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ============================
   PUBLIC
============================ */

// Get Fee by Program
router.get(
  "/program/:programId",
  getFeeByProgram
);

/* ============================
   ADMIN
============================ */

// Get All Fees
router.get(
  "/",
  protect,
  authorize("admin"),
  getFees
);

// Create Fee
router.post(
  "/",
  protect,
  authorize("admin"),
  createFee
);

// Update Fee
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateFee
);

// Delete Fee
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteFee
);

export default router;