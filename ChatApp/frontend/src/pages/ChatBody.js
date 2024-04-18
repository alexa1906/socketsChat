// import React from "react";

// const ChatBody = ({ chat, username, chatName }) => {
//   return (
//     <>
//       <header className="chat__mainHeader">
//         <p>{chatName}</p>
//       </header>
//       <div className="message__container">
//         {chat.map((payload, index) => (
//           <h3
//             key={index}
//             className={
//               username === payload.username
//                 ? "message__sender"
//                 : "message__recipient"
//             }
//           >
//             {payload.username}: <span>{payload.message}</span>
//           </h3>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ChatBody;

import React, { useEffect, useState } from "react";

const ChatBody = ({ chat, username, chatName, messages }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      const filtered = messages.filter(
        (message) =>
          (message.username === username && message.reciver === chatName) ||
          (message.username === chatName && message.reciver === username) ||
          (chatName === "General Chat" && message.reciver === "General Chat")
      );

      setFilteredMessages(filtered);
    }
  }, [chatName, messages]);

  return (
    <>
      <header className="chat__mainHeader">
        <p>{chatName}</p>
      </header>
      <div className="message__container">
        {filteredMessages.map((payload, index) => (
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
    </>
  );
};

export default ChatBody;
