import api from "../api/axios";

// Register
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};

// Get Logged-in User
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

// Logout
export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};