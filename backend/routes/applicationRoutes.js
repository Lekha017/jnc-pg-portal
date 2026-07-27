import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  submitApplication,
  getMyApplication,
  updateApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", protect, submitApplication);

router.get("/my", protect, getMyApplication);

router.put("/:id", protect, updateApplication);

export default router;