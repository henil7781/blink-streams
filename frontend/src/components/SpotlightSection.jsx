import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SpotlightCard from "./SpotlightCard";
import "../css/SpotlightSection.css";

function SpotlightSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/trending-articles/")
      .then((res) => {
        const data = [...res.data];
        if (data.length > 0) {
          // Shuffle using Fisher-Yates algorithm
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
          }
          // Pick first 3 random articles
          setArticles(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching spotlight articles:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="spotlight-loading">Loading spotlight...</p>;
  }

  if (articles.length === 0) {
    return <p className="spotlight-loading">No articles available.</p>;
  }

  return (
    <div className="spotlight-section">
      <h2 className="spotlight-title">SPOTLIGHT</h2>
      <div className="spotlight-grid">
        {articles.map((article) => (
          <SpotlightCard key={article.id} article={article} />
        ))}
      </div>
      <div className="explore-more">
        <Link to="/trending" className="explore-btn">
          EXPLORE MORE →
        </Link>
      </div>
    </div>
  );
}

export default SpotlightSection;
