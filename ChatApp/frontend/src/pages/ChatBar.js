import plus from "../img/plus.png";
import React, { useState } from "react";
import { Modal, Input, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAllChats } from "../App";

const ChatBar = ({ username, setChatName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [error, setError] = useState(false);

  const { allChats } = useAllChats();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setFriendUsername("");
    if (friendUsername !== username) {
      setChatName(`${friendUsername}+${username}`);
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

  const chooseChat = (chatName) => {
    setChatName(chatName);
  };

  return (
    <div className="chat__sidebar">
      <h2 className="user-info">{username}</h2>
      <div>
        <h4 className="chat__header">ACTIVE CHATS</h4>
        <div className="chat__users">
          {Object.keys(allChats).map((chatName) => {
            if (chatName.includes(username) || chatName === "General Chat") {
              return (
                <p key={chatName} onClick={() => chooseChat(chatName)}>
                  {chatName}
                </p>
              );
            } else {
              return null; // Don't render if the chatName doesn't include username
            }
          })}
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
