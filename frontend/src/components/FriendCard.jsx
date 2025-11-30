import defaultPerson from "../assets/defaultPerson.svg";
import UserStatus from "./UserStatus";

export default function FriendCard({ friend }) {
  function friendStatus() {
    const lastActive = new Date(friend.last_activity).getTime();
    const now = Date.now();
    const timeDiff = now - lastActive;
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
      <UserStatus user={friend} />
      <p>
        {friend.username} - Last Online {friendStatus()}
      </p>
    </div>
  );
}
