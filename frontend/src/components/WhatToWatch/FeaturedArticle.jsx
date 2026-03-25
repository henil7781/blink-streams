import React from "react";
import TrendingCard from "./TrendingCard";

function FeaturedArticle({ article, onClick }) {
  return (
    <div className="featured-article">
      <TrendingCard article={article} type="featured" onClick={onClick} />
    </div>
  );
}

export default FeaturedArticle;
