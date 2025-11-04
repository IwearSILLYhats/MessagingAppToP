export default function ChatCard({ chat, openChat }) {
  return (
    <li onClick={() => openChat(chat.id)}>
      <img src={chat.img_url} alt="" className="chatImg" />
      <p>{chat.title}</p>
    </li>
  );
}
