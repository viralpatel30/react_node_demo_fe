import axios, { AxiosRequestConfig } from "axios";

const api_base_url = import.meta.env.VITE_API_BASE_URL;
// const access_token_key = import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN;

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

// axiosInstance.interceptors.request.use((config) => {
//   const user_token = localStorage.getItem(access_token_key);

//   if (user_token) {
//     config.headers.Authorization = `Bearer ${user_token}`;
//   }

//   return config;
// });

export default axiosInstance;
