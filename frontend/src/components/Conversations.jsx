import { useState, useMemo } from "react";
import ChatCard from "./ChatCard";
import ConversationForm from "./ConversationForm";

export default function Conversations({
  conversations,
  friends,
  setChat,
  user,
}) {
  const [chatForm, setChatForm] = useState(false);
  function drawerToggle() {}
  function newChat() {
    setChatForm(!chatForm);
  }
  return (
    <section className="conversations">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => newChat()}>New Chat</button>
      {chatForm && <ConversationForm friends={friends} />}
      <ul>
        {!conversations && <h3>You don't have any conversations!</h3>}
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation) => (
            <ChatCard
              chat={conversation}
              openChat={setChat}
              key={conversation.id}
              user={user}
            />
          ))}
      </ul>
    </section>
  );
}
