import axios from "axios";

export const extractTasks = async (notes) => {
  const res = await axios.post("http://localhost:5000/api/meetings", {
    notes,
  });
  return res.data;
};