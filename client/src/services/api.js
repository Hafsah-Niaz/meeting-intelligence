import axios from "axios";

export const extractTasks = async (notes) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/extract`, {
    notes,
  });
  return res.data;
};