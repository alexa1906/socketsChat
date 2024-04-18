import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ChatPage from "./pages/ChatPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
// trebuie sa fac privete route la main

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const client = new QueryClient();
const socket = io("http://localhost:3002");

function App() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  // const ProtectedRoute = ({ redirectPath = "/" }) => {
  //   if (!localStorage.getItem("jwtToken")) {
  //     return <Navigate to={redirectPath} replace />;
  //   }

  //   return <Outlet />;
  // };

  const AppRoutes = () => {
    const location = useLocation();
    const { username } = location.state || {};
    // const username = "user";

    const [chatName, setChatName] = useState("General Chat");


    const sendMessage = (message) => {
      console.log(message);
      socket.emit("message", { username, message, reciver: chatName });
    };

    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route
          path="/chatpage"
          element={
            <ChatPage
              userName={username}
              chat={chat}
              sendMessage={sendMessage}
              chatName={chatName}
              setChatName={setChatName}
            />
          }
        />
        {/* </Route> */}
      </Routes>
    );
  };

  return (
    <div>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
