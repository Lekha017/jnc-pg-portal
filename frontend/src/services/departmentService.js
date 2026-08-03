import api from "../api/axios";

// =======================
// PUBLIC
// =======================

export const getDepartments = async (params = {}) => {
  const response = await api.get("/departments", {
    params,
  });

  return response.data;
};

export const getDepartmentBySlug = async (slug) => {
  const response = await api.get(`/departments/${slug}`);
  return response.data.data;
};

// =======================
// ADMIN
// =======================

export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/id/${id}`);
  return response.data.data;
};

export const createDepartment = async (departmentData) => {
  const response = await api.post("/departments", departmentData);
  return response.data;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await api.put(`/departments/${id}`, departmentData);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};