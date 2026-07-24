import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  checkAuth,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", protect, getProfile);

router.get("/check-auth", protect, checkAuth);

export default router;