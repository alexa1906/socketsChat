import axiosInstance from "../axios";

// const getUser = () => {
//   console.log("getting the user");
//   return axiosInstance.get("/user/me/${token}");
// };

// const getAllUsers = () => {
//   console.log("getting all the users");
//   return axiosInstance.get("/user");
// };

const fetchMessages = () => {
  return axiosInstance.get("/api/data");
  // .then(response => response.json())
  // .then(data => {
  //     console.log(data.message); // Output: Hello from the backend!
  // })
  // .catch(error => {
  //     console.error('Error:', error);
  // });
};
export {  fetchMessages };

