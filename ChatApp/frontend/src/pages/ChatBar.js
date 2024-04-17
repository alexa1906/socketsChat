import React from "react";
// import { useGetUser } from "../hooks/useGetUser";
import { useGetAllUsers } from "../hooks/useGetAllUsers";

const ChatBar = ({ username }) => {
  // const token = localStorage.getItem("jwtToken")
  // const { data, isLoading, error } = useGetUser(token);
  const { data, isLoading, error } = useGetAllUsers();
  console.log(data);

  return (
    <div className="chat__sidebar">
      <h2>{username}</h2>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>
            Name: {data.name} 
          </h3>
        </div>
      )} */}
    </div>
  );
};

export default ChatBar;
