export default function FriendList() {
  function drawerToggle() {}
  function addFriend() {}
  return (
    <section className="friendlist">
      <button onClick={() => drawerToggle()}>|||</button>
      <button onClick={() => addFriend()}>Add Friend</button>
      <ul>
        {/* Friends List */}
        <li></li>
      </ul>
    </section>
  );
}
