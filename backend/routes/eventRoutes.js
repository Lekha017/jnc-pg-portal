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
  getFacultyEvents,
  createFacultyEvent,
  updateFacultyEvent,
  deleteFacultyEvent,
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
   Faculty Routes
=========================== */

// Get events belonging to faculty's department(s)
router.get(
  "/faculty/my-events",
  protect,
  authorize("faculty"),
  getFacultyEvents
);

// Create department event
router.post(
  "/faculty",
  protect,
  authorize("faculty"),
  upload.single("poster"),
  createFacultyEvent
);

// Update department event
router.put(
  "/faculty/:id",
  protect,
  authorize("faculty"),
  upload.single("poster"),
  updateFacultyEvent
);

// Delete department event
router.delete(
  "/faculty/:id",
  protect,
  authorize("faculty"),
  deleteFacultyEvent
);
/* ===========================
   Single Event
=========================== */

// Keep this LAST
router.get("/:id", getEventById);

export default router;