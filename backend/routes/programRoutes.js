import express from "express";

import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ==========================
   PUBLIC
========================== */

router.get("/", getPrograms);

router.get("/:id", getProgramById);

/* ==========================
   ADMIN
========================== */

router.post(
  "/",
  protect,
  authorize("admin"),
  createProgram
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateProgram
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProgram
);

export default router;