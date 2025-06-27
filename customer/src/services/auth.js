import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (role, credentials) => {
  try {
    const res = await axios.post(`${API}/${role}/login`, credentials);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
