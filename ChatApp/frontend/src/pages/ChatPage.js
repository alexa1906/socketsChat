import React, { useEffect } from "react";
import ChatSidebar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ sendMessage, username, setChatName, chatName }) => {

  return (
    <div className="chat">
      <ChatSidebar username={username}  setChatName={setChatName}/>
      <div className="chat__main">
        <ChatBody username={username}  chatName={chatName}
             />
        <ChatFooter sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
