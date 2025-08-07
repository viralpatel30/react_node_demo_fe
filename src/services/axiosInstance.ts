import axios, { AxiosRequestConfig } from "axios";

const api_base_url = import.meta.env.VITE_API_BASE_URL;
const access_token = import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN;

console.log("API Base URL:", api_base_url);

const axiosConfig: AxiosRequestConfig = {
  baseURL: api_base_url,
  timeout: 3600000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  withCredentials: false,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  const userDetails = JSON.parse(localStorage.getItem(access_token) ?? "[]");
  const authToken = userDetails ? userDetails.accessToken : "";
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export default axiosInstance;
