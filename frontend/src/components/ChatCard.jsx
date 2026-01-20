import chatIcon from "../assets/defaultchat.svg";

export default function ChatCard({ chat, openChat, user }) {
  function setTitle() {
    if (chat.type === "DIRECT") {
      if (chat.owner.id !== user.id) return `DM - ${chat.owner.username}`;
      return `DM - ${chat.users[0].username}`;
    }
    return chat.title;
  }
  return (
    <li onClick={() => openChat(chat.id)} className="chatCard">
      <img src={chat?.img_url || chatIcon} alt="" className="cardImg" />
      <p>{setTitle()}</p>
    </li>
  );
}
