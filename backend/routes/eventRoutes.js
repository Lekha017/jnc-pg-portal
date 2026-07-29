import express from "express";

import {
  createEvent,
  getEvents,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
  getOngoingEvents,
  getCompletedEvents,
  getEventsByDepartment,
  updateEvent,
  deleteEvent,
  togglePublishStatus,
} from "../controllers/eventController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Published Events Only
router.get("/", getEvents);

// Upcoming Events
router.get("/upcoming", getUpcomingEvents);

// Ongoing Events
router.get("/ongoing", getOngoingEvents);

// Completed Events
router.get("/completed", getCompletedEvents);

// Events By Department
router.get("/department/:departmentId", getEventsByDepartment);

/* ===========================
   Admin Routes
=========================== */

// Get All Events (Published + Draft)
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllEvents
);

// Create Event
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("poster"),
  createEvent
);

// Update Event
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("poster"),
  updateEvent
);

// Delete Event
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteEvent
);

// Publish / Unpublish
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

/* ===========================
   Single Event
=========================== */

// Keep this LAST
router.get("/:id", getEventById);

export default router;