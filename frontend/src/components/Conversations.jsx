import { useState, useMemo } from "react";
import ChatCard from "./ChatCard";

export default function Conversations({ conversations }) {
  const [chatToggle, setChatToggle] = useState(false);
  function drawerToggle() {}
  function newChat() {}
  function filterChats(chats) {
    let direct = [];
    let group = [];
  }
  function toggleChat() {
    setChatToggle(!chatToggle);
  }
  function openChat() {}
  return (
    <section className="conversations">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => newChat()}>New Chat</button>
      <button onClick={() => toggleChat()}>Group/DM Toggle</button>
      <ul>
        {!conversations && <h3>You don't have any conversations!</h3>}
        {conversations && <ChatCard openChat={openChat} />}
      </ul>
    </section>
  );
}
