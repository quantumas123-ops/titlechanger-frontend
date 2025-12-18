"use client";

import { useEffect, useState } from "react";

type Video = {
  videoId: string;
  title: string;
};

export default function Dashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch videos
  useEffect(() => {
    fetch("http://localhost:5000/youtube/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Failed to load videos");
        setLoading(false);
      });
  }, []);

  // Select all toggle
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map((v) => v.videoId));
    }
    setSelectAll(!selectAll);
  };

  // Select single video
  const toggleVideo = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  // Update titles
  const updateTitles = async () => {
    if (!newTitle.trim()) {
      alert("Enter new title or hashtags");
      return;
    }

    if (selectedVideos.length === 0) {
      alert("Select at least one video");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/youtube/update-titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          videoIds: selectedVideos,
        }),
      });

      if (!res.ok) throw new Error();

      setMessage("✅ Titles updated successfully");

      // Update UI titles
      setVideos((prev) =>
        prev.map((v) =>
          selectedVideos.includes(v.videoId)
            ? { ...v, title: newTitle }
            : v
        )
      );
    } catch {
      setMessage("❌ Failed to update titles");
    }

    setUpdating(false);
  };

  return (
    <div
      style={{
        background: "#f4f4f4",
        minHeight: "100vh",
        padding: "40px",
        color: "#000",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>Dashboard</h1>

        {/* INPUT */}
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new title / hashtags"
          style={{
            padding: "10px",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={updateTitles}
          disabled={updating}
          style={{
            padding: "10px 16px",
            background: "#000",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {updating ? "Updating..." : "Update Titles"}
        </button>

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
        )}

        <hr style={{ margin: "25px 0" }} />

        {/* SELECT ALL */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
          />{" "}
          <strong>Select All Videos</strong>
        </label>

        {/* VIDEOS LIST */}
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.videoId}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <input
                type="checkbox"
                checked={selectedVideos.includes(video.videoId)}
                onChange={() => toggleVideo(video.videoId)}
                style={{ marginRight: "10px" }}
              />
              {video.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
