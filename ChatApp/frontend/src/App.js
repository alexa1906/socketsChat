import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ChatPage from "./pages/ChatPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const client = new QueryClient();
const socket = io("http://localhost:3002");

const AllChatsContext = createContext();

function App() {
  const [allChats, setAllChats] = useState({
    "General Chat": { chatName: "General Chat", messages: [] },
  });
  // const [oldMessages, setOldMessages] = useState({});

  useEffect(() => {
    socket.on("message", (payload) => {
      const reciver = payload.chatName;
      const username = payload.message.username;
      const message = payload.message.message;

      const chatName = reciver === "General Chat" ? "General Chat" : reciver;

      setAllChats((prevChats) => {
        const updatedChats = { ...prevChats };

        if (updatedChats[chatName]) {
          updatedChats[chatName].messages.push({ username, message });
        } else {
          updatedChats[chatName] = {
            chatName,
            messages: [{ username, message }],
          };
        }
        return updatedChats;
      });
    });
  }, []);

  console.log(allChats);

  const AppRoutes = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const [chatName, setChatName] = useState();

    const sendMessage = (message) => {
      console.log(message);
      const chatNameToSend =
        chatName === "General Chat" ? "General Chat" : chatName;

      socket.emit("message", {
        chatName: chatNameToSend,
        message: { username, message },
      });
    };

    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/chatpage"
          element={
            <ChatPage
              sendMessage={sendMessage}
              username={username}
              chatName={chatName}
              setChatName={setChatName}
            />
          }
        />
      </Routes>
    );
  };

  return (
    <div>
      <AllChatsContext.Provider value={{ allChats, setAllChats }}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </AllChatsContext.Provider>
    </div>
  );
}

// Custom hook to access allChats context
function useAllChats() {
  const context = useContext(AllChatsContext);
  if (context === undefined) {
    throw new Error("useAllChats must be used within a AllChatsProvider");
  }
  return context;
}

export { useAllChats, App as default };
