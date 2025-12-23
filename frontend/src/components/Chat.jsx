import { useState } from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useEffect } from "react";
import defaultChat from "../assets/defaultchat.svg";
import FriendshipUI from "./FriendshipUI";

export default function Chat({ chat }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    async function fetchMessages() {
      const token = JSON.parse(localStorage.getItem("token"));
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/chat/${chat}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const response = await request.json();
      if (response.id) {
        setActiveChat(response);
      }
      if (response.messages) {
        setMessages(response.messages);
      }
    }
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  function setTitle() {
    if (activeChat.type === "DIRECT") {
      if (activeChat.owner.id !== activeChat.user) {
        return `DM - ${activeChat.owner.username}`;
      }
      return `DM - ${activeChat.users[0].username}`;
    }
    return activeChat.title;
  }
  return (
    <main className="chat">
      {!activeChat && <h3>Select a chat to open</h3>}
      {activeChat && (
        <div>
          <img
            src={activeChat.img_url || defaultChat}
            alt=""
            className="chatImg"
          />
          <h3>{setTitle()}</h3>
        </div>
      )}
      <div>
        {messages && <MessageList messages={messages} />}
        {(activeChat && activeChat.type === "DIRECT" && activeChat.friendships[0].status !== "ACCEPTED") ? <FriendshipUI friendship={activeChat.friendships[0]} user={activeChat.user}/> : <MessageForm chat={activeChat} />}
      </div>
    </main>
  );
}
