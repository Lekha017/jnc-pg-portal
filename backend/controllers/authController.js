import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import PasswordResetOTP from "../models/PasswordResetOTP.js";
import sendEmail from "../utils/sendEmail.js";
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
   SEND FORGOT PASSWORD OTP
=========================== */

export const sendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await PasswordResetOTP.deleteMany({ email });

    await PasswordResetOTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendEmail(
      email,
      "JNC PG Portal - Password Reset OTP",
      `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP.",
    });
  }
};

/* ===========================
   VERIFY OTP
=========================== */

export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await PasswordResetOTP.findOne({
      email,
      otp,
    });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (record.expiresAt < new Date()) {
      await record.deleteOne();

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
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
   RESET PASSWORD
=========================== */

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const record = await PasswordResetOTP.findOne({
      email,
      otp,
    });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (record.expiresAt < new Date()) {
      await record.deleteOne();

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    await record.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
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