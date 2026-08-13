import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/programs`;

export const getPrograms = async () => {
  const res = await axios.get(API_URL, {
    withCredentials: true,
  });

  return res.data;
};

export const getProgramById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });

  return res.data;
};

export const createProgram = async (programData) => {
  const res = await axios.post(
    API_URL,
    programData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const updateProgram = async (
  id,
  programData
) => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    programData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const deleteProgram = async (id) => {
  const res = await axios.delete(
    `${API_URL}/${id}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};