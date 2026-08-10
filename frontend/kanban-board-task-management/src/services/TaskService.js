import axiosInstance from "../api/axiosConfig";

export const getTasks = async () => {

    const response = await axiosInstance.get("/api/tasks");

    return response.data;

};