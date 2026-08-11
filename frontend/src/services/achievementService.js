import axios from "axios";

const API = import.meta.env.VITE_API_URL;

/* =========================================================
   PUBLIC — GET ALL PUBLISHED ACHIEVEMENTS
========================================================= */

export const getAchievements = async (params = {}) => {
  try {
    const response = await axios.get(`${API}/achievements`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch achievements",
      }
    );
  }
};


/* =========================================================
   PUBLIC — GET STUDENT ACHIEVEMENTS
========================================================= */

export const getStudentAchievements = async (params = {}) => {
  try {
    const response = await axios.get(`${API}/achievements`, {
      params: {
        ...params,
        type: "student",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching student achievements:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch student achievements",
      }
    );
  }
};


/* =========================================================
   PUBLIC — GET FACULTY ACHIEVEMENTS
========================================================= */

export const getFacultyAchievements = async (params = {}) => {
  try {
    const response = await axios.get(`${API}/achievements`, {
      params: {
        ...params,
        type: "faculty",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching faculty achievements:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch faculty achievements",
      }
    );
  }
};


/* =========================================================
   PUBLIC — GET ACHIEVEMENTS BY DEPARTMENT
========================================================= */

export const getAchievementsByDepartment = async (
  departmentId,
  params = {}
) => {
  try {
    const response = await axios.get(
      `${API}/achievements/department/${departmentId}`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching department achievements:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message:
          "Failed to fetch department achievements",
      }
    );
  }
};


/* =========================================================
   PUBLIC — GET SINGLE ACHIEVEMENT
========================================================= */

export const getAchievementById = async (id) => {
  try {
    const response = await axios.get(
      `${API}/achievements/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching achievement:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch achievement",
      }
    );
  }
};


/* =========================================================
   ADMIN — GET ALL ACHIEVEMENTS
========================================================= */

export const getAllAchievements = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API}/achievements/admin/all`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all achievements:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch achievements",
      }
    );
  }
};


/* =========================================================
   ADMIN — CREATE ACHIEVEMENT
========================================================= */

export const createAchievement = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API}/achievements`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating achievement:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to create achievement",
      }
    );
  }
};


/* =========================================================
   ADMIN — UPDATE ACHIEVEMENT
========================================================= */

export const updateAchievement = async (
  id,
  formData
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API}/achievements/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating achievement:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update achievement",
      }
    );
  }
};


/* =========================================================
   ADMIN — DELETE ACHIEVEMENT
========================================================= */

export const deleteAchievement = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API}/achievements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting achievement:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete achievement",
      }
    );
  }
};


/* =========================================================
   ADMIN — PUBLISH / UNPUBLISH
========================================================= */

export const toggleAchievementPublishStatus = async (
  id
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${API}/achievements/${id}/publish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error toggling achievement publish status:",
      error
    );

    throw (
      error.response?.data || {
        success: false,
        message:
          "Failed to update achievement publish status",
      }
    );
  }
};