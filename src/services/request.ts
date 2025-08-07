import { ProductData } from "../models/Product";
import { RegisterData } from "../models/Register";
import { API_ENDPOINTS } from "../utils/route";
import axiosInstance from "./axiosInstance";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.LOGIN,
      JSON.stringify(data)
    );
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REGISTER,
      JSON.stringify(data)
    );
    return response.data;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
};

export const createProduct = async (data: ProductData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_PRODUCT,
      JSON.stringify(data)
    );
    return response.data;
  } catch (err) {
    console.error("Product Creation failed:", err);
    throw err;
  }
};

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_PRODUCTS);
    return response.data;
  } catch (err) {
    console.error("Product fetching failed:", err);
    throw err;
  }
};
