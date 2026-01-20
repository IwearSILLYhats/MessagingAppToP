import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import apiFetch from "../util/fetch";

export default function FriendRequestForm() {
  const [requested, setRequested] = useState(true);
  const [user, setUser] = useState(null);
  const [lookupList, setLookupList] = useState(null);

  useEffect(() => {
    const request = setTimeout(() => {
      if (user === null) return;
      async function friendLookup() {
        const newFriends = await apiFetch(`user/friend/${user}`);
        if (newFriends) {
          setLookupList(newFriends);
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
    const request = await apiFetch(`user/friend`, {
      method: "POST",
      body: JSON.stringify({
        friendId: lookupList.id,
      }),
    });
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
