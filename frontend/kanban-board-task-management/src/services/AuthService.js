import axiosInstance from "../api/axiosConfig";

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const register = async (registerData) => {
  const response = await axiosInstance.post("/auth/register", registerData);
  return response.data;
};
