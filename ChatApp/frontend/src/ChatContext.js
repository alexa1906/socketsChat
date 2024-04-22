import React, { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allMessagesContext, setAllMessagesContext] = useState([]);

  return (
    <ChatContext.Provider value={{ allMessagesContext, setAllMessagesContext }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
