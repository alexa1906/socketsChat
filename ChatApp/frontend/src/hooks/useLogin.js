import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const useLogin = () => {
  const { mutateAsync, error, isPending } = useMutation({
    onSuccess: (responseData) => {
      const { access_token, refresh_token } = responseData.data;

      if (access_token && refresh_token) {
        localStorage.setItem("jwtAccessToken", access_token);
        localStorage.setItem("jwtRefreshToken", refresh_token);
      }
    },
    mutationFn: (values) =>
      axiosInstance.post("/user/login", {
        username: values.username,
        email: values.email,
        password: values.password,
      }),
  });

  return { mutateAsync, isPending, error };
};
