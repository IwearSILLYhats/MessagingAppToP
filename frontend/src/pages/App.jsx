import { useNavigate } from "react-router";
import { useEffect } from "react";
import Chat from "../components/Chat";
import Conversations from "../components/Conversations";
import FriendList from "../components/FriendList";
import useLocalStorage from "../hooks/useLocal";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useLocalStorage("login", null);

  useEffect(() => {
    if (!login || login === null) navigate("/login", { replace: true });
  }, [login]);

  return (
    <>
      {login && (
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
