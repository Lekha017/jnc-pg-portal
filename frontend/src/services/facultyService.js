import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/faculty`,
  withCredentials: true,
});

// ==============================
// Public APIs
// ==============================

export const getAllFaculty = async (params) => {
  const { data } = await api.get("/", { params });
  return data;
};

export const getFacultyDropdown = async () => {
  const { data } = await api.get("/dropdown");
  return data;
};

export const getFacultyById = async (id) => {
  const { data } = await api.get(`/${id}`);
  return data;
};

// ==============================
// Admin APIs
// ==============================

export const createFaculty = async (formData) => {
  const { data } = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateFaculty = async (id, formData) => {
  const { data } = await api.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteFaculty = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

// ==============================
// Faculty APIs
// ==============================

export const getMyFacultyProfile = async () => {
  const { data } = await api.get("/me/profile");
  return data;
};

export const updateMyFacultyProfile = async (formData) => {
  const { data } = await api.put("/me/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export default api;