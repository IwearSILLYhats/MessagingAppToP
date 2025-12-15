export default function MessageList({ messages }) {
  return (
    <ul className="messageList">
      {!messages ||
        (messages.length <= 0 && <p>No messages in this chat yet!</p>)}
      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          return;
        })}
    </ul>
  );
}
