import api from "../api/axios";

// ==========================
// Get All Galleries (Admin)
// ==========================
export const getGalleries = async (params = {}) => {
  const response = await api.get("/gallery/admin/all", {
    params,
  });

  return response.data;
};

// ==========================
// Get Published Galleries (Public)
// ==========================
export const getPublishedGalleries = async () => {
  const response = await api.get("/gallery");
  return response.data;
};

// ==========================
// Get Single Gallery
// ==========================
export const getGalleryById = async (id) => {
  const response = await api.get(`/gallery/${id}`);
  return response.data;
};

// ==========================
// Create Gallery
// ==========================
export const createGallery = async (formData) => {
  const response = await api.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==========================
// Update Gallery
// ==========================
export const updateGallery = async (id, formData) => {
  const response = await api.put(`/gallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==========================
// Delete Gallery
// ==========================
export const deleteGallery = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};

// ==========================
// Publish / Unpublish Gallery
// ==========================
export const toggleGalleryPublishStatus = async (id) => {
  const response = await api.patch(`/gallery/${id}/publish`);
  return response.data;
};