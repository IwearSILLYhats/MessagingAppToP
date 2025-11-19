export default function FriendCard({ friend }) {
  function friendStatus() {
    const lastActive = new Date(friend.last_activity);
    const now = Date.now();
    const timeDiff = now - lastActive.getTime();
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
    <div className="friendCard">
      <img
        className="profileImg"
        src={
          friend.profile_img_url ||
          "https://www.svgrepo.com/show/529487/chat-round.svg"
        }
        alt=""
      />
      <p>
        {friend.username} - Last Online {friendStatus()}
      </p>
    </div>
  );
}
