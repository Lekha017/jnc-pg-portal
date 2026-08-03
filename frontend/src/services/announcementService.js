import api from "./api";

/* ===========================
   PUBLIC
=========================== */

export const getAnnouncements = async () => {
  const { data } = await api.get("/announcements");
  return data;
};

export const getAnnouncementById = async (id) => {
  const { data } = await api.get(`/announcements/${id}`);
  return data;
};

/* ===========================
   ADMIN
=========================== */

export const getAllAnnouncements = async () => {
  const { data } = await api.get("/announcements/admin/all");
  return data;
};

export const createAnnouncement = async (announcement) => {
  const { data } = await api.post(
    "/announcements",
    announcement
  );

  return data;
};

export const updateAnnouncement = async (
  id,
  announcement
) => {
  const { data } = await api.put(
    `/announcements/${id}`,
    announcement
  );

  return data;
};

export const deleteAnnouncement = async (id) => {
  const { data } = await api.delete(
    `/announcements/${id}`
  );

  return data;
};