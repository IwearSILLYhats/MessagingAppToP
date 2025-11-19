import { useState } from "react";
import FriendCard from "./FriendCard";
import UserUI from "./UserUI";
import FriendRequestForm from "./FriendRequestForm";

export default function FriendList({ friends, user }) {
  function drawerToggle() {}
  const [friendRequest, setFriendRequest] = useState(false);
  return (
    <section className="friends">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => setFriendRequest(!friendRequest)}>
        Add Friend
      </button>
      {friendRequest && <FriendRequestForm />}
      <ul>
        {/* Friends List */}
        {!friends && <h3>You have no friends!</h3>}
        {friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <li>
              <FriendCard friend={friend} />
            </li>
          ))}
      </ul>
      {user && <UserUI user={user} />}
    </section>
  );
}
