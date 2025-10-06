import ActiveUsersPanel from "./ActiveUsersPanel.jsx";
import { useWebSocket } from "./socket";

export default function App() {
  const { activeUsers, sendFile, sendMsg } = useWebSocket("ws://localhost:8080");
  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        onChange={(e) => e.target.files[0] && sendFile(e.target.files[0])}
      />
      <ActiveUsersPanel users={activeUsers} sendMsg={sendMsg} />
    </div>
  );
}
