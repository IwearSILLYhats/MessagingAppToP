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

  useEffect(() => {
    if (!token || token === null) navigate("/token", { replace: true });
  }, [token]);

  return (
    <>
      {token && (
        <>
          <Conversations />
          <Chat />
          <FriendList />
        </>
      )}
    </>
  );
}

export default App;
