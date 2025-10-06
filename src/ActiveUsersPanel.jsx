import { useState } from "react";
export default function ActiveUsersPanel({ users, sendMsg }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendFileToUser = () => {
    if (selectedUser) {
      sendMsg({ event: "send_file_to", user: selectedUser });
    } else {
      alert("Please select a user first");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        width: "350px",
        background: "#f9f9f9",
        marginTop: "10px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>👥 Select User to Send File</h2>
      <h4>🟢 Active Users ({users.length})</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user}
            style={{
              padding: "4px 0",
              borderBottom: "1px solid #eee",
              fontSize: "14px",
            }}
          >
            {user}{" "}
            <input
              type="radio"
              value={selectedUser}
              name="user"
              onChange={(e) => setSelectedUser(e.target.value)}
            />
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSendFileToUser}>Send File</button>
      </div>
    </div>
  );
}
