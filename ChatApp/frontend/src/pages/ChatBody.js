import React from "react";

const ChatBody = ({ chat, username }) => {
  return (
    <div className="message__container">
      {chat.map((payload, index) => (
        <h3
          key={index}
          className={
            username === payload.username
              ? "message__sender"
              : "message__recipient"
          }
        >
          {payload.username}: <span>{payload.message}</span>
        </h3>
      ))}
    </div>
  );
};

export default ChatBody;
