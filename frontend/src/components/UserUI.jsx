import useLocalStorage from "../hooks/useLocal";

export default function UserUI({ user }) {
  const [token, setToken] = useLocalStorage("token", null);
  return (
    <div>
      <img
        src={
          user?.profile_img_url ||
          "https://www.svgrepo.com/show/529487/chat-round.svg"
        }
        alt="ProfilePicture"
      />
      <p>{user.username}</p>
      <span>Online Status</span>
      <button onClick={() => setToken(null)}>Logout</button>
    </div>
  );
}
