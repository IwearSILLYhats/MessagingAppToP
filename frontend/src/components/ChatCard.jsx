import chatIcon from "../assets/defaultchat.svg";

export default function ChatCard({ chat, openChat }) {
  return (
    <li onClick={() => openChat(chat.id)} className="chatCard">
      <img src={chat?.img_url || chatIcon} alt="" className="cardImg" />
      <p>{chat.title}</p>
    </li>
  );
}
