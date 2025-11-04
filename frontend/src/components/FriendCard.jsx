export default function FriendCard({ friend }) {
  return (
    <li>
      <img src={friend.profile_img_url} alt="" />
      <span status={friend.last_activity}>status dot</span>
      <p>{friend.username}</p>
    </li>
  );
}
