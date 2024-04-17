import axios from "axios";
const token = localStorage.getItem("jwtToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
