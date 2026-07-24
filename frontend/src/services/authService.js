import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Register
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};

// Logged-in User
export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");
  return data;
};

// Logout (we'll implement backend later if needed)
export const logoutUser = async () => {
  const { data } = await API.post("/auth/logout");
  return data;
};