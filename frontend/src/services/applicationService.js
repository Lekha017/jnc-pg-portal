import axios from "axios";

const API_URL = "http://localhost:5000/api/application";

export const submitApplication = async (applicationData) => {
  const res = await axios.post(API_URL, applicationData, {
    withCredentials: true,
  });

  return res.data;
};

export const getMyApplication = async () => {
  const res = await axios.get(`${API_URL}/my`, {
    withCredentials: true,
  });

  return res.data;
};

export const updateApplication = async (
  id,
  applicationData
) => {
  const res = await axios.put(
    `${API_URL}/${id}`,
    applicationData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};