import express from "express";
import {
  submitContact,
  getAllContacts,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", submitContact);

router.get("/", protect, authorize("admin"), getAllContacts);

export default router;