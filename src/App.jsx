import { useState } from "react";
import ActiveUsersPanel from "./ActiveUsersPanel.jsx";
import AvailableFilesPanel from "./AvailableFilesPanel.jsx";
import UploadFilePanel from "./UploadFilePanel.jsx";
import { useWebSocket } from "./socket";

export default function App() {
  const {
    activeUsers,
    files,
    sendFile,
    sendMsg,
    progressMsg,
    pcState,
    dcState,
  } = useWebSocket("ws://localhost:8080");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div style={{ padding: 20 }}>
      <h3>Kotlin-JavaScript File Transfer</h3>
      <h4>Peer Connection State: {pcState} </h4>
      <h4>
        Data Channel State:{" "}
        {pcState === "CONNECTED" && dcState === "OPEN" ? dcState : ""}
      </h4>
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
