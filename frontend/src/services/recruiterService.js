import api from "../api/axios";

// ==========================
// Get All Recruiters
// ==========================
export const getRecruiters = async () => {
  const response = await api.get("/recruiters");
  return response.data;
};

// ==========================
// Get Published Recruiters
// ==========================
export const getPublishedRecruiters =
  async () => {
    const response = await api.get(
      "/recruiters/published"
    );

    return response.data;
  };

// ==========================
// Get Single Recruiter
// ==========================
export const getRecruiterById =
  async (id) => {
    const response = await api.get(
      `/recruiters/${id}`
    );

    return response.data;
  };

// ==========================
// Create Recruiter
// ==========================
export const createRecruiter =
  async (formData) => {
    const response = await api.post(
      "/recruiters",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

// ==========================
// Update Recruiter
// ==========================
export const updateRecruiter =
  async (id, formData) => {
    const response = await api.put(
      `/recruiters/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

// ==========================
// Delete Recruiter
// ==========================
export const deleteRecruiter =
  async (id) => {
    const response = await api.delete(
      `/recruiters/${id}`
    );

    return response.data;
  };