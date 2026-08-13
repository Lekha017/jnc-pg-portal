import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/program-details`;

/* ==========================
   GET ALL PROGRAM DETAILS
========================== */

export const getProgramDetails =
  async () => {
    const res = await axios.get(API_URL);

    return res.data;
  };

/* ==========================
   GET SINGLE DETAILS
========================== */

export const getProgramDetailsById =
  async (id) => {
    const res = await axios.get(
      `${API_URL}/${id}`
    );

    return res.data;
  };

/* ==========================
   GET DETAILS BY PROGRAM
========================== */

export const getDetailsByProgram =
  async (programId) => {
    const res = await axios.get(
      `${API_URL}/program/${programId}`
    );

    return res.data;
  };

/* ==========================
   CREATE DETAILS
========================== */

export const createProgramDetails =
  async (detailsData) => {
    const res = await axios.post(
  API_URL,
  detailsData,
  {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

    return res.data;
  };

/* ==========================
   UPDATE DETAILS
========================== */

export const updateProgramDetails =
  async (id, detailsData) => {
    const res = await axios.put(
  `${API_URL}/${id}`,
  detailsData,
  {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

    return res.data;
  };

/* ==========================
   DELETE DETAILS
========================== */

export const deleteProgramDetails =
  async (id) => {
    const res = await axios.delete(
      `${API_URL}/${id}`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  };