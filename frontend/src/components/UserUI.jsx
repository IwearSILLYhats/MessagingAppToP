import useLocalStorage from "../hooks/useLocal";
import UserStatus from "./UserStatus";

export default function UserUI({ user }) {
  const [token, setToken] = useLocalStorage("token", null);
  return (
    <div className="userCard">
      <div className="userStatus">
        <UserStatus user={user} />
        <p>{user.username}</p>
      </div>
      <button onClick={() => setToken(null)} className="logout">
        Logout
      </button>
    </div>
  );
}
