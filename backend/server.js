import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* ===========================
   Middleware
=========================== */

app.use(
  cors({
    origin: "http://localhost:5173", // React Vite
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

/* ===========================
   Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faculty", facultyRoutes);

app.get("/", (req, res) => {
  res.send("🚀 JNC PG Portal Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});