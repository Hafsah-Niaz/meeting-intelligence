import axios from "axios";

export const extractTasks = async (notes) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/meetings`, {
    notes,
  });
  return res.data;
};