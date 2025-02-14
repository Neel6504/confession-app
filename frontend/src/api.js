import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signup = async (form) => {
  return await axios.post(`${API_URL}/signup`, form);
};

export const login = async (form) => {
  return await axios.post(`${API_URL}/login`, form);
};
