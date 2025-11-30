import { useState } from "react";

export default function ConversationForm({ friends }) {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [users, setUsers] = useState([]);
  async function createConversation(e) {
    e.preventDefault();
    setSubmitted(true);
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const request = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          img_url: url,
          users: users,
        }),
      });
    }
  }

  return (
    <form action="" method="post" onSubmit={(e) => createConversation(e)}>
      <input
        type="text"
        name="title"
        id="title"
        required
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="img_url"
        id="img_url"
        placeholder="Image url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <select
        name="users"
        id="users"
        multiple
        value={users}
        onChange={(e) => {
          const options = [...e.target.selectedOptions];
          const values = options.map((option) => option.value);
          setUsers(values);
        }}
      >
        {friends &&
          friends.length > 0 &&
          friends.map((friend) => {
            return (
              <option value={friend.id} key={friend.id}>
                {friend.username}
              </option>
            );
          })}
      </select>
      <button type="submit" disabled={submitted}>
        Create
      </button>
    </form>
  );
}
