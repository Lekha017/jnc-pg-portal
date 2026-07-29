import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// =======================
// PUBLIC ROUTES
// =======================

router.get("/", getDepartments);

router.get("/:slug", getDepartmentById);

// =======================
// ADMIN ROUTES
// =======================

router.post("/", protect, authorize("admin"), createDepartment);

router.put("/:id", protect, authorize("admin"), updateDepartment);

router.delete("/:id", protect, authorize("admin"), deleteDepartment);

export default router;