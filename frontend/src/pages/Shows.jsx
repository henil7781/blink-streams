import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeaturedArticle from "../components/FeaturedArticle";
import PopularNow from "../components/PopularNow";
import ExploreMore from "../components/ExploreMore";
import "../css/Trending.css";

function Shows() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tv-shows/") // ✅ make sure this endpoint exists in Django
      .then((res) => {
        let data = [...res.data];
        // Shuffle to get random order
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setArticles(data);
      })
      .catch((err) => {
        console.error("Error fetching TV shows:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/tv-shows/${id}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading TV Shows...</p>;
  }

  const featured = articles.slice(0, 1);
  const popularNow = articles.slice(1, 4);
  const exploreMore = articles.slice(4);

  return (
    <div className="trending-page">
      {featured.length > 0 && (
        <FeaturedArticle article={featured[0]} onClick={handleClick} theme="shows"/>
      )}
      {popularNow.length > 0 && (
        <PopularNow articles={popularNow} onClick={handleClick} />
      )}
      <h2>More What to Watch</h2>
      {exploreMore.length > 0 && (
        <ExploreMore articles={exploreMore} onClick={handleClick} />
      )}
    </div>
  );
}

export default Shows;
