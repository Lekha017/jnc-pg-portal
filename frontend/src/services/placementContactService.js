import api from "../api/axios";

// ==========================
// Get Published Contact (Public)
// ==========================
export const getPlacementContact = async () => {
  const response = await api.get("/placement-contact");
  return response.data;
};

// ==========================
// Get All Contacts (Admin)
// ==========================
export const getPlacementContacts = async () => {
  const response = await api.get("/placement-contact/admin");
  return response.data;
};

// ==========================
// Create Contact
// ==========================
export const createPlacementContact = async (formData) => {
  const response = await api.post(
    "/placement-contact",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Update Contact
// ==========================
export const updatePlacementContact = async (
  id,
  formData
) => {
  const response = await api.put(
    `/placement-contact/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Delete Contact
// ==========================
export const deletePlacementContact = async (id) => {
  const response = await api.delete(
    `/placement-contact/${id}`
  );

  return response.data;
};