import MessageCard from "./MessageCard";

export default function MessageList({ messages }) {
  console.log(messages);
  return (
    <ul className="messageList">
      {!messages ||
        (messages.length <= 0 && <p>No messages in this chat yet!</p>)}
      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          return <MessageCard message={message} key={message.id} />;
        })}
    </ul>
  );
}
