import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  checkAuth,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   AUTH
=========================== */

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

/* ===========================
   FORGOT PASSWORD
=========================== */

router.post(
  "/forgot-password",
  sendForgotPasswordOTP
);

router.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOTP
);

router.post(
  "/reset-password",
  resetPassword
);

/* ===========================
   USER
=========================== */

router.get("/profile", protect, getProfile);

router.get("/check-auth", protect, checkAuth);

export default router;