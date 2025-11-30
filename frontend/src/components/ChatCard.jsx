export default function ChatCard({ chat, openChat }) {
  return (
    <li onClick={() => openChat(chat.id)}>
      <img
        src={
          chat?.img_url || "https://www.svgrepo.com/show/529487/chat-round.svg"
        }
        alt=""
        className="profileImg"
      />
      <p>{chat.title}</p>
    </li>
  );
}
