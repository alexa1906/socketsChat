import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export const useGetUser = (token) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => axiosInstance.get(`/user/me/${token}`),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    console.log("is loading");
  }

  if (error) {
    console.log(error);
  }

  return { isLoading, error, data };
};

// nu merge 403