import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";

export default function FriendRequestForm() {
  const [requested, setRequested] = useState(true);
  const [user, setUser] = useState(null);
  const [lookupList, setLookupList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const request = setTimeout(() => {
      if (user === null) return;
      async function friendLookup() {
        const newFriends = await fetch(
          `${import.meta.env.VITE_API_URL}/user/friend/${user}`
        );
        const response = await newFriends.json();
        if (newFriends) {
          setLookupList(response);
        }
      }
      friendLookup();
    }, 2000);
    return () => {
      clearTimeout(request);
    };
  }, [user]);
  async function sendFriendRequest(e) {
    e.preventDefault();
    setRequested(true);
    const token = localStorage.getItem("token");
    if (token) {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/user/friend`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: {
            friendId: user.id,
          },
        }
      );
    }
  }
  return (
    <form
      action=""
      method="get"
      onSubmit={(e) => {
        sendFriendRequest(e);
      }}
    >
      <h3>Send Friend Request</h3>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Write Friends Username Here"
        required
        onChange={(e) => setUser(e.target.value)}
      />
      {lookupList && (
        <div
          onClick={() => {
            setSelectedUser(lookupList);
            setRequested(false);
          }}
        >
          <FriendCard friend={lookupList} />
        </div>
      )}
      <button type="submit" disabled={requested}>
        Submit
      </button>
    </form>
  );
}
