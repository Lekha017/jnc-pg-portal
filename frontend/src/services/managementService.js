import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/management`,
  withCredentials: true,
});

/* ===========================
   PUBLIC APIs
=========================== */

export const getAllManagement = async () => {
  const { data } = await api.get("/");
  return data;
};

export const getManagementById = async (id) => {
  const { data } = await api.get(`/${id}`);
  return data;
};

/* ===========================
   ADMIN APIs
=========================== */

export const addManagement = async (formData) => {
  const { data } = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateManagement = async (id, formData) => {
  const { data } = await api.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteManagement = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

export default api;