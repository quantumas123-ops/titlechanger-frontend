const [error, setError] = useState("");

"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
  const loadVideos = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "QUOTA_EXCEEDED") {
          setError(
            "Daily YouTube API limit reached. Please try again later."
          );
        } else {
          setError("Unable to load videos. Please refresh.");
        }
        return;
      }

      setVideos(data);
      setError(""); // clear old error
    } catch (err) {
      setError("Server is waking up. Please refresh in 10 seconds.");
    }
  };

  loadVideos();
}, []);


  const updateTitles = async () => {
    setLoading(true);
    await fetch(`${backend}/api/update-titles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, videos })
    });
    alert("Titles updated successfully");
    
    setLoading(false);
  };
  

  return (
    <main style={{ maxWidth: 600, margin: "auto", paddingTop: 50 }}>
      <h2>Dashboard</h2>

      <input
        placeholder="Enter new title / hashtags"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button
        onClick={updateTitles}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Processing..." : "Update Titles"}
      </button>
{error && (
  <p style={{ color: "orange", marginTop: 10 }}>
    ⚠️ {error}
  </p>
)}

      <p>{videos.length} videos loaded</p>
    </main>
  );
}

