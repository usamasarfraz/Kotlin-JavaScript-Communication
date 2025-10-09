import { useEffect, useState } from "react";

export function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [progressMsg, setProgressMsg] = useState("");

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.binaryType = "arraybuffer"; // ensure binary is preserved

    ws.onopen = () => {
      console.log("✅ Connected to Kotlin WebSocket");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case "active_users":
          setActiveUsers(msg.users || []);
          break;
        case "available_files":
          setFiles(msg.files || []);
          break;
        case "file_saved":
          console.log(`💾 File saved on server: ${msg.name}`);
          break;
        case "file_transfer_progress":
          setProgressMsg(msg.msg);
          break;
        default:
          console.log("📩 Message:", msg);
      }
    };

    ws.onclose = () => {
      console.warn("❎ Disconnected");
    };

    ws.onerror = (e) => {
      console.error("❌ Socket error:", e);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  // Send message to server
  const sendMsg = (msgObj) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msgObj));
    } else {
      console.warn("WebSocket not ready");
    }
  };

  const sendFile = async (file) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Step 1: send JSON header
      const header = JSON.stringify({
        event: "file_metadata",
        name: file.name,
        type: file.type,
        size: bytes.length,
      });
      socket.send(header);

      // Step 2: send raw file data
      socket.send(bytes.buffer);
    } else {
      console.warn("WebSocket not ready");
    }
  };

  return { socket, activeUsers, files, sendMsg, sendFile, progressMsg };
}
