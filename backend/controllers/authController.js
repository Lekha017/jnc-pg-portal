import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* ===========================
   Cookie Options
=========================== */

const cookieOptions = {
  httpOnly: true,
  secure: false, // true in production
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* ===========================
   REGISTER USER
=========================== */

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      department,
      role,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      department,
      role: role || "student",
    });

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================
   LOGIN USER
=========================== */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================
   GET PROFILE
=========================== */

export const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

/* ===========================
   LOGOUT
=========================== */

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

/* ===========================
   CHECK AUTH
=========================== */

export const checkAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};