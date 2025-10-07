import React from "react";

export default function AvailableFilesPanel({
  files,
  setSelectedFile,
  selectedFile,
}) {
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
      <h2 style={{ marginTop: 0 }}>📎 Select File to Send</h2>
      <h4>📂 Available Files ({files.length})</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((f, i) => (
          <li
            key={i}
            style={{
              padding: "4px 0",
              borderBottom: "1px solid #eee",
              fontSize: "14px",
            }}
          >
            {f}{" "}
            <input
              type="radio"
              value={selectedFile}
              name="files"
              onChange={(e) => setSelectedFile(e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
