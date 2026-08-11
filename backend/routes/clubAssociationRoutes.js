import express from "express";

import {
  createClubAssociation,
  getAllClubAssociationsAdmin,
  getClubAssociations,
  getClubAssociationsByDepartment,
  getClubAssociationById,
  updateClubAssociation,
  deleteClubAssociation,
} from "../controllers/clubAssociationController.js";

import upload from "../middleware/upload.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================================================
// PUBLIC ROUTES
// =========================================================

// Get all published clubs and associations

router.get(
  "/",
  getClubAssociations
);

// =========================================================
// GET BY DEPARTMENT
// PUBLIC
// =========================================================

router.get(
  "/department/:departmentId",
  getClubAssociationsByDepartment
);

// =========================================================
// ADMIN - GET ALL
// Published + Unpublished
// =========================================================

router.get(
  "/admin/all",
  protect,
  getAllClubAssociationsAdmin
);

// =========================================================
// GET SINGLE
// PUBLIC
// =========================================================

router.get(
  "/:id",
  getClubAssociationById
);

// =========================================================
// CREATE
// PROTECTED
// =========================================================

router.post(
  "/",
  protect,
  upload.array("images", 10),
  createClubAssociation
);

// =========================================================
// UPDATE
// PROTECTED
// =========================================================

router.put(
  "/:id",
  protect,
  upload.array("images", 10),
  updateClubAssociation
);

// =========================================================
// DELETE
// PROTECTED
// =========================================================

router.delete(
  "/:id",
  protect,
  deleteClubAssociation
);

export default router;