import { useState } from "react";
import ActiveUsersPanel from "./ActiveUsersPanel.jsx";
import AvailableFilesPanel from "./AvailableFilesPanel.jsx";
import UploadFilePanel from "./UploadFilePanel.jsx";
import { useWebSocket } from "./socket";

export default function App() {
  const { activeUsers, files, sendFile, sendMsg, progressMsg } = useWebSocket(
    "ws://localhost:8080"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div style={{ padding: 20 }}>
      <UploadFilePanel sendFile={sendFile} />
      <AvailableFilesPanel
        files={files}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <ActiveUsersPanel
        users={activeUsers}
        sendMsg={sendMsg}
        selectedFile={selectedFile}
        progressMsg={progressMsg}
      />
    </div>
  );
}
