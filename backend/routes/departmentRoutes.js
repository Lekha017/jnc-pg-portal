import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getDepartmentBySlug,
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

// Get by MongoDB ID (Admin Edit)
router.get("/id/:id", getDepartmentById);

// Get by slug (Public Details)
router.get("/:slug", getDepartmentBySlug);

// =======================
// ADMIN ROUTES
// =======================

router.post("/", protect, authorize("admin"), createDepartment);

router.put("/:id", protect, authorize("admin"), updateDepartment);

router.delete("/:id", protect, authorize("admin"), deleteDepartment);

export default router;