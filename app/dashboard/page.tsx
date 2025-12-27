"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("https://titlechanger-backend.onrender.com/videos", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setVideos)
      .catch(console.error);
  }, []);

  const updateTitles = async () => {
    await fetch(
      "https://titlechanger-backend.onrender.com/update-titles",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          videos: videos.map((v) => v.id),
        }),
      }
    );

    alert("Titles updated!");
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>Dashboard</h2>

      <input
        placeholder="Enter new title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button onClick={updateTitles} style={{ marginTop: 10 }}>
        Update Titles
      </button>

      <p>Videos loaded: {videos.length}</p>

      {videos.map((v) => (
        <div key={v.id} style={{ marginTop: 10 }}>
          <img src={v.thumbnail} width={160} />
          <p>{v.title}</p>
        </div>
      ))}
    </main>
  );
}
