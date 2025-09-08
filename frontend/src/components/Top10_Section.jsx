// src/components/Top10_Section.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Top10.css";

export default function Top10Section({ country = "global", type = "films" }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTop10();
  }, [country, type]);

  const fetchTop10 = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/top10/${country}/${type}/`
      );
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load Top 10:", err);
    }
  };

  const handlePlay = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

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
