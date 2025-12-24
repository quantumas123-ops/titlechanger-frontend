"use client";
import { useState } from "react";
const [videos, setVideos] = useState<any[]>([]);
const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
const [showPublicOnly, setShowPublicOnly] = useState(false);


export default function Dashboard() {
  const [error, setError] = useState(""); c const [title, setTitle] = useState("");

  return (
    <main style={{ maxWidth: 600, margin: "auto", paddingTop: 50 }}>
      <h2>Dashboard</h2>

      <input
        placeholder="Enter new title / hashtags"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button style={{ marginTop: 10 }}>
        Update Titles
      </button>
    </main>
  );
}
