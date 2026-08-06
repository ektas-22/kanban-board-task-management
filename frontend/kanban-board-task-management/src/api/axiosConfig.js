import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;