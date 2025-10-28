import ChatCard from "./ChatCard";

export default function Conversations() {
  function drawerToggle() {}
  function newChat() {}
  function toggleChat() {}
  function openChat() {}
  return (
    <section className="conversations">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => newChat()}>New Chat</button>
      <button onClick={() => toggleChat()}>Group/DM Toggle</button>
      <ul>
        {/* Chat List */}
        <ChatCard openChat={openChat} />
      </ul>
    </section>
  );
}
