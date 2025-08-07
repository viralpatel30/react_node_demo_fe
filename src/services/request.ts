import axiosInstance from "./axiosInstance";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post(
      "/Account/Login",
      JSON.stringify(data)
    );
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
