import express from "express";

import {
  createRecruiter,
  getRecruiters,
  getPublishedRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
} from "../controllers/recruiterController.js";

import upload from "../middleware/upload.js";

const router = express.Router();


// Get All Recruiters
router.get("/", getRecruiters);

// Get Published Recruiters
router.get(
  "/published",
  getPublishedRecruiters
);

// Get Single Recruiter
router.get(
  "/:id",
  getRecruiterById
);

// Create Recruiter
router.post(
  "/",
  upload.single("logo"),
  createRecruiter
);

// Update Recruiter
router.put(
  "/:id",
  upload.single("logo"),
  updateRecruiter
);

// Delete Recruiter
router.delete(
  "/:id",
  deleteRecruiter
);

export default router;