"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortMode, setSortMode] = useState<"latest" | "best">("latest");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`)
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  const sortedVideos = [...videos].sort((a, b) => {
    if (sortMode === "best") {
      return (
        Number(b.statistics.viewCount) -
        Number(a.statistics.viewCount)
      );
    }
    return 0;
  });

  const updateTitles = async () => {
    setLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-titles`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, videos: sortedVideos }),
      }
    );
    setLoading(false);
    alert("Titles updated successfully");
  };

  return (
    <main style={{ maxWidth: 900, margin: "auto", padding: 40 }}>
      <h2>Dashboard</h2>

      <input
        placeholder="Enter new title / hashtags"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setSortMode("best")}>
          Best Performing
        </button>

        <button
          onClick={() => setSortMode("latest")}
          style={{ marginLeft: 10 }}
        >
          Latest
        </button>
      </div>

      <button
        onClick={updateTitles}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        {loading ? "Updating..." : "Update Titles"}
      </button>

      <p style={{ marginTop: 20 }}>
        Videos loaded: {sortedVideos.length}
      </p>

      {/* 🔥 VIDEO LIST WITH THUMBNAILS */}
      <div style={{ marginTop: 30 }}>
        {sortedVideos.map((video) => (
          <div
            key={video.id}
            style={{
              display: "flex",
              gap: 15,
              marginBottom: 15,
              alignItems: "center",
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
            }}
          >
            <img
              src={
                video.snippet.thumbnails.medium?.url ||
                video.snippet.thumbnails.default?.url
              }
              width={160}
              height={90}
              style={{ borderRadius: 6 }}
              alt="Thumbnail"
            />

            <div>
              <strong>{video.snippet.title}</strong>
              <p style={{ margin: 0, color: "#555" }}>
                👁 {Number(video.statistics.viewCount).toLocaleString()} views
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
