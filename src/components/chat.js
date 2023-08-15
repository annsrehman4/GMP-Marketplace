import React, { useState, useEffect } from "react";
import Navbar from "./homepage";
import { ref, onValue, push } from "firebase/database";
import { database } from "../FirebaseConfig";
import { useUserAuth } from "../context/UserAuthContextProvider"; // Import the user context



function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUserAuth(); // Get the user information from context

  useEffect(() => {
    const chatRef = ref(database, "chats/chatId1/messages");
    onValue(chatRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.values(messageData);
        setMessages(messageList);
      }
    });
  }, []);

  const sendMessage = () => {
    const chatRef = ref(database, "chats/chatId1/messages");
    const newMessageData = {
      sender: user.displayName, // Use the user's display name as the sender
      message: newMessage,
    };
    push(chatRef, newMessageData);
    setNewMessage("");
  };

  return (
    <>
      <Navbar /> {/* You might want to customize the navbar for the chat component */}
      <div className="Chat">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === user.displayName ? "user1" : "user2"}`}
            >
              {message.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chat;
