import React from "react";

export default function UploadFilesPanel({sendFile}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        width: "350px",
        background: "#f3f9ff",
        marginTop: "10px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>📄 Add File</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <input
          type="file"
          onChange={(e) => e.target.files[0] && sendFile(e.target.files[0])}
        />
      </ul>
    </div>
  );
}
