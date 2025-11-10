import UserUI from "./UserUI";

export default function FriendList({ friends, user }) {
  function drawerToggle() {}
  function addFriend() {}
  return (
    <section className="friends">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => addFriend()}>Add Friend</button>
      <ul>
        {/* Friends List */}
        {!friends && <h3>You have no friends!</h3>}
      </ul>
      <UserUI user={user} />
    </section>
  );
}
