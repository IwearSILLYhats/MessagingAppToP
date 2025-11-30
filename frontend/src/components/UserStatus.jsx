import defaultPerson from "../assets/defaultPerson.svg";
export default function UserStatus({ user }) {
  function statusColor(activity) {
    const lastActivity = new Date(activity);
    const now = Date.now();
    const timeDiff = now - lastActivity.getTime();
    const minutes = Math.floor(timeDiff / 1000 / 60);
    if (minutes < 5) {
      return "green";
    } else if (minutes < 30) {
      return "yellow";
    } else {
      return "red";
    }
  }
  return (
    <div className="statusCard">
      <img
        src={user.profile_img_url || defaultPerson}
        alt={user.username}
        className="profileImg"
      />
      <span
        className="onlineStatus"
        style={{ backgroundColor: statusColor(user.last_activity) }}
      ></span>
    </div>
  );
}
