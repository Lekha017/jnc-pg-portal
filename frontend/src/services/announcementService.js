import api from "../api/axios";

// ==========================
// Public Announcements
// ==========================
export const getAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data;
};

// ==========================
// Get Single Announcement
// ==========================
export const getAnnouncementById = async (id) => {
  const response = await api.get(`/announcements/${id}`);
  return response.data;
};

// ==========================
// Get By Category
// ==========================
export const getAnnouncementsByCategory = async (category) => {
  const response = await api.get(
    `/announcements/category/${category}`
  );
  return response.data;
};

// ==========================
// Get By Department
// ==========================
export const getAnnouncementsByDepartment = async (
  departmentId
) => {
  const response = await api.get(
    `/announcements/department/${departmentId}`
  );
  return response.data;
};