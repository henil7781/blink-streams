// src/components/ShowsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/ShowsSection.css";

function ShowsSection() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tv-shows/")
      .then((res) => {
        const data = [...res.data];
        if (data.length > 0) {
          // Shuffle array
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
          }
          // Take only first 3
          setShows(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching TV shows:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="spotlight-loading">Loading Shows...</p>;
  }

  if (shows.length === 0) {
    return <p className="spotlight-loading">No shows available.</p>;
  }

  return (
    <section className="shows-section">
      <h2 className="section-title">SHOWS</h2>
      <div className="cards-container">
        {shows.map((show) => (
          <div
            className="show-card"
            key={show.id}
            onClick={() => navigate(`/tv-shows/${show.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={show.image_url}
              alt={show.headline}
              className="show-image"
            />
            <div className="show-meta">
              {(show.eyebrow || "TV").toUpperCase()}
            </div>
            <h3 className="show-title">{formatItalic(show.headline)}</h3>
            <p className="show-subtitle">{show.subheadline || ""}</p>
            <div className="show-author">
              BY {show.author} &nbsp;&nbsp; {show.article_date}
            </div>
          </div>
        ))}
      </div>
      <div className="more-link" onClick={() => navigate("/tv-shows")}>
        MORE SHOWS
      </div>
    </section>
  );
}

// Utility: italic content between * *
function formatItalic(text) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    )
  );
}

export default ShowsSection;
