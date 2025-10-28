import Chat from "../components/Chat";
import Conversations from "../components/Conversations";
import FriendList from "../components/FriendList";
import "./App.css";

function App() {
  return (
    <div>
      <Conversations />
      <Chat />
      <FriendList />
    </div>
  );
}

export default App;
