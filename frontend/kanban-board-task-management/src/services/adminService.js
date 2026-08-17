import axiosInstance from "../api/axiosConfig";

export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("/api/admin/dashboard");
  return response.data;
};

export const getAllUsers = async (
  page = 0,
  size = 5,
  sortBy = "createdAt",
  direction = "desc",
) => {
  const response = await axiosInstance.get("api/admin/users", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });
  return response.data;
};
export const getUserById = async (userId) => {
  const response = await axiosInstance.get(`/api/admin/users/${userId}`);
  return response.data;
};
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/api/admin/users/${userId}`);
  return response.data;
};
export const getAllTasks = async (
  page = 0,
  size = 5,
  sortBy = "createdAt",
  direction = "desc",
) => {
  const response = await axiosInstance.get("/api/admin/tasks", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};
export const getTaskById = async (taskId) => {
  const response = await axiosInstance.get(`/api/admin/tasks/${taskId}`);
  return response.data;
};
export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/api/admin/tasks/${taskId}`);
  return response.data;
};
