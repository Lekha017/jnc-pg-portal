import api from "./api";

// =========================================================
// CREATE
// =========================================================

export const createClubAssociation = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("department", data.department);
  formData.append(
    "isPublished",
    data.isPublished
  );

  if (data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await api.post(
    "/club-associations",
    formData
  );

  return response.data;
};

// =========================================================
// GET ALL - ADMIN
// =========================================================

export const getAllClubAssociations = async () => {
  const response = await api.get(
    "/club-associations/admin/all"
  );

  return response.data;
};

// =========================================================
// GET PUBLISHED - PUBLIC
// =========================================================

export const getClubAssociations = async () => {
  const response = await api.get(
    "/club-associations"
  );

  return response.data;
};

// =========================================================
// GET BY DEPARTMENT - PUBLIC
// =========================================================

export const getClubAssociationsByDepartment = async (
  departmentId
) => {
  const response = await api.get(
    `/club-associations/department/${departmentId}`
  );

  return response.data;
};

// =========================================================
// GET SINGLE
// =========================================================

export const getClubAssociationById = async (id) => {
  const response = await api.get(
    `/club-associations/${id}`
  );

  return response.data;
};

// =========================================================
// UPDATE
// =========================================================

export const updateClubAssociation = async (
  id,
  data
) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("department", data.department);
  formData.append(
    "isPublished",
    data.isPublished
  );

  if (data.removeImages?.length > 0) {
    formData.append(
      "removeImages",
      JSON.stringify(data.removeImages)
    );
  }

  if (data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await api.put(
    `/club-associations/${id}`,
    formData
  );

  return response.data;
};

// =========================================================
// DELETE
// =========================================================

export const deleteClubAssociation = async (id) => {
  const response = await api.delete(
    `/club-associations/${id}`
  );

  return response.data;
};