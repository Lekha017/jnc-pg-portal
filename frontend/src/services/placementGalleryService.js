import api from "./api";

/* ==============================
   Get All Galleries
============================== */
export const getPlacementGalleries = async () => {
      console.log("Calling API...");
  const res = await api.get("/placement-gallery");
  return res.data;
};

/* ==============================
   Get Single Gallery
============================== */
export const getPlacementGallery = async (id) => {
  const res = await api.get(`/placement-gallery/${id}`);
  return res.data;
};

/* ==============================
   Create Gallery
============================== */
export const createPlacementGallery = async (formData) => {
  const res = await api.post(
    "/placement-gallery",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* ==============================
   Update Gallery
============================== */
export const updatePlacementGallery = async (
  id,
  formData
) => {
  const res = await api.put(
    `/placement-gallery/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* ==============================
   Delete Gallery
============================== */
export const deletePlacementGallery = async (id) => {
  const res = await api.delete(
    `/placement-gallery/${id}`
  );

  return res.data;
};