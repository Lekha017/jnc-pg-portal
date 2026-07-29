import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/faculty`,
  withCredentials: true,
});

// ==============================
// Public APIs
// ==============================

export const getAllFaculty = (params) =>
  api.get("/", { params });

export const getFacultyById = (id) =>
  api.get(`/${id}`);

// ==============================
// Admin APIs
// ==============================

export const createFaculty = (data) =>
  api.post("/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateFaculty = (id, data) =>
  api.put(`/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteFaculty = (id) =>
  api.delete(`/${id}`);

// ==============================
// Faculty APIs
// ==============================

export const getMyFacultyProfile = () =>
  api.get("/me/profile");

export const updateMyFacultyProfile = (data) =>
  api.put("/me/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default api;