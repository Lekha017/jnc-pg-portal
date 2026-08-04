import api from "./api";

/* ===========================
   PUBLIC
=========================== */

// Get Fee by Program
export const getFeeByProgram = async (
  programId
) => {
  const { data } = await api.get(
    `/fees/program/${programId}`
  );

  return data;
};

/* ===========================
   ADMIN
=========================== */

// Get All Fees
export const getFees = async () => {
  const { data } = await api.get(
    "/fees"
  );

  return data;
};

// Create Fee
export const createFee = async (
  feeData
) => {
  const { data } = await api.post(
    "/fees",
    feeData
  );

  return data;
};

// Update Fee
export const updateFee = async (
  id,
  feeData
) => {
  const { data } = await api.put(
    `/fees/${id}`,
    feeData
  );

  return data;
};

// Delete Fee
export const deleteFee = async (
  id
) => {
  const { data } = await api.delete(
    `/fees/${id}`
  );

  return data;
};