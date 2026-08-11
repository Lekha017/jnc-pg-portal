import Event from "../models/Event.js";
import Faculty from "../models/Faculty.js";

const getTodayRange = () => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

// Create Event
export const createEvent = async (req, res) => {
  try {
    let poster = {
      url: "https://placehold.co/800x1000?text=Event+Poster",
      public_id: "",
    };

    if (req.file) {
      poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }
    console.log("BODY:", req.body);

    if (req.file) {
      console.log("FILE PATH:", req.file.path);
      console.log("FILE:", req.file);
    } else {
      console.log("NO FILE RECEIVED");
    }
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department,
      venue: req.body.venue,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      chiefGuest: req.body.chiefGuest,
      registrationLink: req.body.registrationLink,

      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,

      poster,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Published Events (Public)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true })
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events (Admin)
export const getAllEvents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const totalEvents = await Event.countDocuments(filter);

    const events = await Event.find(filter)
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ startDate: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: events.length,
      totalEvents,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("department", "name code")
      .populate("createdBy", "fullName email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upcoming Events
export const getUpcomingEvents = async (req, res) => {
    try {
        const { endOfDay } = getTodayRange();

        const filter = {
            isPublished: true,
            startDate: { $gt: endOfDay },
        };

        // If department is provided,
        // show only that department's events
        if (req.query.department) {
            filter.department = req.query.department;
        }

        const events = await Event.find(filter)
            .populate("department", "name code")
            .sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });

    } catch (error) {
        console.error("Error fetching upcoming events:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Ongoing Events
export const getOngoingEvents = async (req, res) => {
    try {
        const { startOfDay, endOfDay } = getTodayRange();

        const filter = {
            isPublished: true,
            startDate: { $lte: endOfDay },
            endDate: { $gte: startOfDay },
        };

        // If department is provided,
        // show only that department's events
        if (req.query.department) {
            filter.department = req.query.department;
        }

        const events = await Event.find(filter)
            .populate("department", "name code")
            .sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });

    } catch (error) {
        console.error("Error fetching ongoing events:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Completed Events
export const getCompletedEvents = async (req, res) => {
  try {
    const { startOfDay } = getTodayRange();

    const events = await Event.find({
      isPublished: true,
      endDate: { $lt: startOfDay },
    })
      .populate("department", "name code")
      .sort({ endDate: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Events by Department
export const getEventsByDepartment = async (req, res) => {
  try {
    const events = await Event.find({
      department: req.params.departmentId,
      isPublished: true,
    })
      .populate("department", "name code")
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      department: req.body.department,
      venue: req.body.venue,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      chiefGuest: req.body.chiefGuest,
      registrationLink: req.body.registrationLink,

      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,
    };

    if (req.file) {
      updateData.poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Publish / Unpublish
export const togglePublishStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.isPublished = !event.isPublished;

    await event.save();

    res.status(200).json({
      success: true,
      message: `Event ${event.isPublished ? "Published" : "Unpublished"
        } successfully`,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// FACULTY EVENTS
// =====================================================

// Get Faculty's Department Events
export const getFacultyEvents = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      user: req.user._id,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    const departmentIds = faculty.departments;

    const events = await Event.find({
      department: { $in: departmentIds },
    })
      .populate("department", "name code")
      .populate("createdBy", "fullName")
      .sort({ startDate: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Get Faculty Events Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Create Event - Faculty
export const createFacultyEvent = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      user: req.user._id,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    const departmentId = req.body.department;

    // Faculty can only create events for their assigned department
    const hasDepartment = faculty.departments.some(
      (id) => id.toString() === departmentId
    );

    if (!hasDepartment) {
      return res.status(403).json({
        success: false,
        message: "You can only create events for your assigned department.",
      });
    }

    let poster = {
      url: "https://placehold.co/800x1000?text=Event+Poster",
      public_id: "",
    };

    if (req.file) {
      poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      department: departmentId,
      venue: req.body.venue,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      chiefGuest: req.body.chiefGuest,
      registrationLink: req.body.registrationLink,
      isPublished: true,
      poster,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    console.error("Create Faculty Event Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Event - Faculty
export const updateFacultyEvent = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      user: req.user._id,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Check whether the event belongs to faculty's department
    const hasDepartment = faculty.departments.some(
      (id) => id.toString() === event.department.toString()
    );

    if (!hasDepartment) {
      return res.status(403).json({
        success: false,
        message: "You cannot edit events from another department.",
      });
    }

    // If department is being changed, verify the new department too
    if (req.body.department) {
      const canUseDepartment = faculty.departments.some(
        (id) => id.toString() === req.body.department
      );

      if (!canUseDepartment) {
        return res.status(403).json({
          success: false,
          message: "You cannot move an event to another department.",
        });
      }

      event.department = req.body.department;
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.venue = req.body.venue;
    event.startDate = req.body.startDate;
    event.endDate = req.body.endDate;
    event.chiefGuest = req.body.chiefGuest;
    event.registrationLink = req.body.registrationLink;

    if (req.file) {
      event.poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    console.error("Update Faculty Event Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Event - Faculty
export const deleteFacultyEvent = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      user: req.user._id,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Check whether the event belongs to faculty's department
    const hasDepartment = faculty.departments.some(
      (id) => id.toString() === event.department.toString()
    );

    if (!hasDepartment) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete events from another department.",
      });
    }

    await event.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Faculty Event Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};