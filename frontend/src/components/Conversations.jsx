import ChatCard from "./ChatCard";

export default function Conversations({ conversations }) {
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
        {!conversations && <h3>You don't have any conversations!</h3>}
        {conversations && <ChatCard openChat={openChat} />}
      </ul>
    </section>
  );
}
