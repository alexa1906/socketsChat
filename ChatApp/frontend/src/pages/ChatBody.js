import React from "react";
import { useAllChats } from "../App";

const ChatBody = ({ username, chatName }) => {
  const { allChats } = useAllChats();

  const messages = allChats[chatName]?.messages || [];

  return (
    <>
      {chatName ? (
        <>
          <header className="chat__mainHeader">
            <p>{chatName}</p>
          </header>
          <div className="message__container">
            {messages.map((payload, index) => {
              return (
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
              );
            })}
          </div>
        </>
      ) : (
        <>
          <header className="chat__mainHeader">
            <p>{chatName}</p>
          </header>
          <div className="message__container">
            <h1>Choose a Chat</h1>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBody;
