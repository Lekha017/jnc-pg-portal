import api from "./api";

export const askChatbot = async (question) => {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
};