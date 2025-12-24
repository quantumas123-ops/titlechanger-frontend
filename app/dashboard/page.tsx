"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch ONLY PUBLIC videos
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setError("Failed to load videos"));
  }, []);

  const updateTitles = async () => {
    if (!title || videos.length === 0) return;

    setLoading(true);
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-titles`,
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

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to update titles");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <h2>Dashboard</h2>

      <input
        placeholder="Enter new title / hashtags"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={updateTitles} disabled={loading}>
          Update Titles
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 20 }}>
        Videos loaded: {videos.length}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 15,
          marginTop: 20,
        }}
      >
        {videos.map((v) => (
          <div key={v.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img src={v.thumbnail} width="100%" />
            <p>{v.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
