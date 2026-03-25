import React from "react";
import TrendingCard from "./TrendingCard";

function ExploreMore({ articles, onClick }) {
  return (
    <div className="explore-more">
      <h2>EXPLORE MORE</h2>
      <div className="explore-grid">
        {articles.map((article) => (
          <TrendingCard
            key={article.id}
            article={article}
            type="explore"
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreMore;
