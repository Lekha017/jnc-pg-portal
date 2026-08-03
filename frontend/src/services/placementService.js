import api from "../api/axios";

// ==========================
// Public - Published Placements
// ==========================
export const getPlacements = async () => {
  const response = await api.get("/placements");
  return response.data;
};

// ==========================
// Admin - All Placements
// ==========================
export const getAllPlacements = async () => {
  const response = await api.get("/placements/admin/all");
  return response.data;
};

// ==========================
// Get Single Placement
// ==========================
export const getPlacementById = async (id) => {
  const response = await api.get(`/placements/${id}`);
  return response.data;
};

// ==========================
// Get Placements By Department
// ==========================
export const getPlacementsByDepartment = async (
  departmentId
) => {
  const response = await api.get(
    `/placements/department/${departmentId}`
  );

  return response.data;
};

// ==========================
// Get Placements By Year
// ==========================
export const getPlacementsByYear = async (year) => {
  const response = await api.get(
    `/placements/year/${year}`
  );

  return response.data;
};

// ==========================
// Create Placement
// ==========================
export const createPlacement = async (
  placementData
) => {
  const response = await api.post(
    "/placements",
    placementData,
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
// Update Placement
// ==========================
export const updatePlacement = async (
  id,
  placementData
) => {
  const response = await api.put(
    `/placements/${id}`,
    placementData,
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
// Delete Placement
// ==========================
export const deletePlacement = async (
  id
) => {
  const response = await api.delete(
    `/placements/${id}`
  );

  return response.data;
};

// ==========================
// Publish / Unpublish
// ==========================
export const togglePlacementPublish =
  async (id) => {
    const response =
      await api.patch(
        `/placements/${id}/publish`
      );

    return response.data;
  };