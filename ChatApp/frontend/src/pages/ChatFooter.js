import React, { useState } from "react";

const ChatFooter = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form onSubmit={handleSubmit} className="form">
        <input
          className="message"
          type="text"
          name="message"
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="sendBtn">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
