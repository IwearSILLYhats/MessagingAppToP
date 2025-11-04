import { useNavigate } from "react-router";
import { useEffect } from "react";
import Chat from "../components/Chat";
import Conversations from "../components/Conversations";
import FriendList from "../components/FriendList";
import useLocalStorage from "../hooks/useLocal";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    if (!token || token === null) navigate("/token", { replace: true });
  }, [token]);

  return (
    <>
      {token && (
        <div>
          <Conversations />
          <Chat />
          <FriendList />
        </div>
      )}
    </>
  );
}

export default App;
