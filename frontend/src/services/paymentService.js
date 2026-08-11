import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

export const createPaymentOrder = async (applicationId) => {
  const res = await axios.post(
    `${API_URL}/create-order`,
    { applicationId },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const verifyPayment = async (paymentData) => {
  const res = await axios.post(
    `${API_URL}/verify`,
    paymentData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};