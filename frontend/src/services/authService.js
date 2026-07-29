import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  withCredentials: true,
});

// Register
export const registerUser = async (userData) => {
  const { data } = await API.post(
    "/auth/register",
    userData
  );
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await API.post(
    "/auth/login",
    userData
  );
  return data;
};

// Get Logged-in User
export const getProfile = async () => {
  const { data } = await API.get(
    "/auth/profile"
  );
  return data;
};

// Logout
export const logoutUser = async () => {
  const { data } = await API.post(
    "/auth/logout"
  );
  return data;
};

export default API;