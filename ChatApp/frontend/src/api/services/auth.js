import axiosInstance from "../axios";

export const getUser = () => {
  console.log("getting the user");
  return axiosInstance.get("/user/me/${token}");
};

export const getAllUsers = () => {
  console.log("getting all the users");
  return axiosInstance.get("/user");
};
