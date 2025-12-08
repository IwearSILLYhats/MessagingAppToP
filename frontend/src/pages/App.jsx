import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import Conversations from "../components/Conversations";
import FriendList from "../components/FriendList";
import useLocalStorage from "../hooks/useLocal";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);
  const [friends, setFriends] = useState(null);
  const [chat, setChat] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch dashboard data (conversations and friends)
    if (!token || token === null) navigate("/login", { replace: true });
    async function fetchDashboard() {
      const request = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        headers: {
          Authorization: token,
        },
      });
      const response = await request.json();
      if (response.friends || response.friendsOf) {
        let friendsList = [...response.friends, ...response.friendOf]
          .sort((a, b) => {
            return a - b;
          })
          .map((friend) => friend.friend);
        if (friendsList.length > 0) setFriends(friendsList);
      }
      if (
        (response.Chat && response.Chat.length > 0) ||
        (response.owned_chats && response.owned_chats.length > 0)
      ) {
        let chatList = [...response.Chat, ...response.owned_chats];
        setConversations(chatList);
      }
      if (response.id) {
        const { friends, friendOf, Chat, owned_chats, ...rest } = response;
        setUser(rest);
      }
    }
    fetchDashboard();
  }, [token]);

  return (
    <>
      {token && (
        <>
          <Conversations
            conversations={conversations}
            friends={friends}
            setChat={setChat}
          />
          <Chat chat={chat} />
          <FriendList user={user} friends={friends} logout={setToken} />
        </>
      )}
    </>
  );
}

export default App;
