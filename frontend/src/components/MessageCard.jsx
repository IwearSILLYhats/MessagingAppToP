export default function MessageCard({ message }) {
  function messageTimer() {
    const posted = new Date(message.posted_date).getTime();
    const now = Date.now();
    const timeDiff = now - posted;
    const seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
  return (
    <div className="messageCard">
      <img src={message.author.profile_img_url || "#"} alt="profilePicture" />
      <div className="messageBody">
        <div className="messageHeader">
          {message.author.username} - {messageTimer()}
        </div>
        {message.image_url && <img src="#" alt="messageImage" />}
        <p>{message.content}</p>
      </div>
    </div>
  );
}
