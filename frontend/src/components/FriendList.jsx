import { useState } from "react";
import FriendCard from "./FriendCard";
import UserUI from "./UserUI";
import FriendRequestForm from "./FriendRequestForm";

export default function FriendList({ friends, user }) {
  function drawerToggle() {}
  const [friendRequest, setFriendRequest] = useState(false);
  return (
    <section className="friends">
      <div>
        <button onClick={() => drawerToggle()}>|||</button>
        <button onClick={() => setFriendRequest(!friendRequest)}>
          Add Friend
        </button>
        {friendRequest && <FriendRequestForm />}
        <ul>
          {friends &&
            friends.length > 0 &&
            friends.map((friend) => (
              <li key={friend.id}>
                <FriendCard friend={friend} />
              </li>
            ))}
        </ul>
        {!friends && <h3 key={"NoFriends"}>You have no friends!</h3>}
      </div>
      {user && <UserUI user={user} />}
    </section>
  );
}
