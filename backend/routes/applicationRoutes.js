import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
  submitApplication,
  getMyApplication,
  updateApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "photograph", maxCount: 1 },
    { name: "aadhaarDocument", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "degreeMarksheets", maxCount: 1 },
    { name: "transferCertificate", maxCount: 1 },
    { name: "migrationCertificate", maxCount: 1 },
  ]),
  submitApplication
);

router.get("/my", protect, getMyApplication);

router.put("/:id", protect, updateApplication);

export default router;