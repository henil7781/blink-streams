import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeaturedArticle from "../components/FeaturedArticle";
import PopularNow from "../components/PopularNow";
import ExploreMore from "../components/ExploreMore";
import ShowsSection from "../components/ShowsSection";

import "../css/Trending.css";

function WhatToWatch() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/what-to-watch/")
      .then((res) => {
        const data = [...res.data];
        // Shuffle articles for random order
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setArticles(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (id) => {
    navigate(`/what-to-watch/${id}`);
  };

  const featured = articles.slice(0, 1);
  const popularNow = articles.slice(1, 4);
  const exploreMore = articles.slice(4);

  return (
    <div className="trending-page">
      {featured.length > 0 && (
        <FeaturedArticle article={featured[0]} onClick={handleClick} theme="what-to-watch"/>
      )}
      <ShowsSection />
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

export default WhatToWatch;
