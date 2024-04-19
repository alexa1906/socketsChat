import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { fetchMessages } from "../api/services/auth";

const ChatPage = ({ chat, sendMessage, userName, chatName, setChatName }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then((messages) => {
      setMessages(messages.data);
      console.log(123, messages.data);
    });
  }, [chatName]);

  return (
    <div className="chat">
      <ChatSidebar
        username={userName}
        setChatName={setChatName}
        messages={messages}
      />
      <div className="chat__main">
        <ChatBody
          chat={chat}
          username={userName}
          chatName={chatName}
          messages={messages}
        />
        <ChatFooter sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
