import express from "express";

import {
  createProgramDetails,
  getProgramDetails,
  getProgramDetailsById,
  getDetailsByProgram,
  updateProgramDetails,
  deleteProgramDetails,
} from "../controllers/programDetailsController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ==========================
   PUBLIC
========================== */

router.get("/", getProgramDetails);

router.get(
  "/program/:programId",
  getDetailsByProgram
);

router.get(
  "/:id",
  getProgramDetailsById
);

/* ==========================
   ADMIN
========================== */

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("syllabusPdf"),
  createProgramDetails
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("syllabusPdf"),
  updateProgramDetails
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProgramDetails
);

export default router;