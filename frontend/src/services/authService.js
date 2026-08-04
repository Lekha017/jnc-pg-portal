import api from "../api/axios";

// ===========================
// REGISTER
// ===========================

export const registerUser = async (userData) => {
  const { data } = await api.post(
    "/auth/register",
    userData
  );

  return data;
};

// ===========================
// LOGIN
// ===========================

export const loginUser = async (userData) => {
  const { data } = await api.post(
    "/auth/login",
    userData
  );

  return data;
};

// ===========================
// GET PROFILE
// ===========================

export const getProfile = async () => {
  const { data } = await api.get(
    "/auth/profile"
  );

  return data;
};

// ===========================
// LOGOUT
// ===========================

export const logoutUser = async () => {
  const { data } = await api.post(
    "/auth/logout"
  );

  return data;
};

// ===========================
// FORGOT PASSWORD
// ===========================

export const sendForgotPasswordOTP = async (
  email
) => {
  const { data } = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return data;
};

export const verifyForgotPasswordOTP =
  async (email, otp) => {
    const { data } = await api.post(
      "/auth/verify-forgot-password-otp",
      {
        email,
        otp,
      }
    );

    return data;
  };

export const resetPassword = async (
  email,
  otp,
  password
) => {
  const { data } = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password,
    }
  );

  return data;
};