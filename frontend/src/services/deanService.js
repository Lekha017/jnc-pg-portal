import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/deans`,
  withCredentials: true,
});

/* ===========================
   PUBLIC APIs
=========================== */

export const getAllDeans = async () => {
  const { data } = await api.get("/");
  return data;
};

export const getDeanById = async (id) => {
  const { data } = await api.get(`/${id}`);
  return data;
};

/* ===========================
   ADMIN APIs
=========================== */

export const addDean = async (formData) => {
  const { data } = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateDean = async (id, formData) => {
  const { data } = await api.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteDean = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

export default api;