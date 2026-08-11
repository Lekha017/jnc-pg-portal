import api from "../api/axios";

// ==========================
// Public - Published Events Only
// ==========================
export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// ==========================
// Admin - All Events
// ==========================
export const getAllEvents = async (params = {}) => {
  const response = await api.get("/events/admin/all", {
    params,
  });

  return response.data;
};

// ==========================
// Get Upcoming Events
// ==========================
export const getUpcomingEvents = async (departmentId = "") => {
    const response = await api.get("/events/upcoming", {
        params: departmentId
            ? { department: departmentId }
            : {},
    });

    return response.data;
};


// ==========================
// Get Ongoing Events
// ==========================
export const getOngoingEvents = async (departmentId = "") => {
    const response = await api.get("/events/ongoing", {
        params: departmentId
            ? { department: departmentId }
            : {},
    });

    return response.data;
};
// ==========================
// Get Completed Events
// ==========================
export const getCompletedEvents = async () => {
  const response = await api.get("/events/completed");
  return response.data;
};

// ==========================
// Get Single Event
// ==========================
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// ==========================
// Create Event
// ==========================
export const createEvent = async (formData) => {
  const response = await api.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==========================
// Update Event
// ==========================
export const updateEvent = async (id, formData) => {
  const response = await api.put(`/events/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==========================
// Delete Event
// ==========================
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

// ==========================
// Publish / Unpublish Event
// ==========================
export const togglePublishStatus = async (id) => {
  const response = await api.patch(`/events/${id}/publish`);
  return response.data;
};
// ==========================
// Get Published Events By Department
// ==========================
export const getEventsByDepartment = async (departmentId) => {
    const response = await api.get(
        `/events/department/${departmentId}`
    );

    return response.data;
};