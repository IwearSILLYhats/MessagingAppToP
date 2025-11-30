import useLocalStorage from "../hooks/useLocal";
import UserStatus from "./UserStatus";

export default function UserUI({ user }) {
  const [token, setToken] = useLocalStorage("token", null);
  return (
    <div>
      <UserStatus user={user} />
      <p>{user.username}</p>
      <span>Online Status</span>
      <button onClick={() => setToken(null)}>Logout</button>
    </div>
  );
}
