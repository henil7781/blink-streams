import React from "react";
import TrendingCard from "./TrendingCard";

function PopularNow({ articles, onClick }) {
  return (
    <div className="popular-now">
      <h2>POPULAR NOW</h2>
      <div className="popular-grid">
        {articles.map((article) => (
          <TrendingCard
            key={article.id}
            article={article}
            type="popular"
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularNow;
