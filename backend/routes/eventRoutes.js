import express from "express";

import {
  createEvent,
  getEvents,
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

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// All Events
router.get("/", getEvents);

// Upcoming Events
router.get("/upcoming", getUpcomingEvents);

// Ongoing Events
router.get("/ongoing", getOngoingEvents);

// Completed Events
router.get("/completed", getCompletedEvents);

// Department Events
router.get("/department/:departmentId", getEventsByDepartment);

// Event Details
router.get("/:id", getEventById);

/* ===========================
   Admin Routes
=========================== */

// Create Event
router.post("/", protect, authorize("admin"), createEvent);

// Update Event
router.put("/:id", protect, authorize("admin"), updateEvent);

// Delete Event
router.delete("/:id", protect, authorize("admin"), deleteEvent);

// Publish / Unpublish
router.patch(
  "/:id/publish",
  protect,
  authorize("admin"),
  togglePublishStatus
);

export default router;