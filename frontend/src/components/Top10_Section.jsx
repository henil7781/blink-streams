// src/components/Top10_Section.jsx
import React, { useEffect, useState } from "react";
import { fetchTop10 } from "../api/api";
import "../css/Top10.css";

export default function Top10Section({ country = "global", type = "films" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTop10Data();
  }, [country, type]);

  const getTop10Data = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetchTop10(country, type);
      setItems(res.data || []);
    } catch (err) {
      console.error("Failed to load Top 10:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="top-scroll-wrapper">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Something went wrong while loading Top 10 rankings.</p>
        <button className="retry-btn" onClick={getTop10Data}>Retry</button>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="no-data">No ranking data found for this selection.</div>;
  }

  return (
    <div className="top-scroll-wrapper">
      {items.map((item, index) => (
        <div
          key={index}
          className="tudum-card"
          style={{
            backgroundImage: `url(${item.bg_image})`,
          }}
        >
          <span className="rank-num">{String(index + 1).padStart(2, "0")}</span>

          {/* Poster overlay */}
          <img src={item.poster} alt={item.title} className="poster-img" />

          {/* Movie/Show Title */}
          <div className="card-title">{item.title}</div>

          {/* Buttons */}
          <div className="overlay-buttons">
            {item.watch_link && (
              <button
                className="play-btn"
                onClick={() => handlePlay(item.watch_link)}
              >
                ▶
              </button>
            )}
            <button className="add-btn">＋</button>
          </div>
        </div>
      ))}
    </div>
  );
}
