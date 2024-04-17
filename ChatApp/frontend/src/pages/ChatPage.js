import React from "react";
import ChatSidebar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ chat, sendMessage, userName }) => {
  return (
    <div className="App">
      <ChatSidebar username={userName} />
      <ChatBody chat={chat} username={userName} />
      <ChatFooter sendMessage={sendMessage} />
    </div>
  );
};

export default ChatPage;
