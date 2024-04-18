import plus from "../img/plus.png";
import React, { useState, useEffect } from "react";
import { Modal, Input, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ChatBar = ({ username, setChatName, messages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const userMessages = messages.filter(
        (message) =>
          message.username === username || message.reciver === username
      );

      const uniqueChats = userMessages.reduce((unique, message) => {
        let otherUser;
        if (message.username === username) {
          otherUser = message.reciver;
        } else if (message.reciver === username) {
          otherUser = message.username;
        }

        if (!unique.includes(otherUser) && otherUser !== username) {
          unique.push(otherUser);
        }
        return unique;
      }, []);

      if (!uniqueChats.includes("General Chat")) {
        uniqueChats.push("General Chat");
      }

      setChats(uniqueChats);
    }
  }, [messages, username]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setFriendUsername("");
    if (friendUsername !== username) {
      setChatName(friendUsername);
      setIsModalOpen(false);
      setError(false); 
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError(false);
  };

  const handleFriendUsernameChange = (e) => {
    setFriendUsername(e.target.value);
    setError(false); 
  };

  const chooseChat = (chat) => {
    setChatName(chat);
  };

  return (
    <div className="chat__sidebar">
      <h2 className="user-info">{username}</h2>
      <div>
        <h4 className="chat__header">ACTIVE CHATS</h4>
        <div className="chat__users">
          {chats.map((chat) => (
            <p key={chat} onClick={() => chooseChat(chat)}>
              {chat}
            </p>
          ))}
        </div>
      </div>

      <button className="plus_sidebar" onClick={showModal}>
        <img src={plus} className="img_plus" alt="Add Chat" />
      </button>
      <Modal
        title="Start a new chat with: "
        open={isModalOpen} 
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          size="large"
          placeholder="Friend Username"
          prefix={<UserOutlined />}
          value={friendUsername}
          onChange={handleFriendUsernameChange}
        />

        {error && (
          <Alert type="error" message="You cannot chat with yourself!" banner />
        )}
      </Modal>
    </div>
  );
};

export default ChatBar;
