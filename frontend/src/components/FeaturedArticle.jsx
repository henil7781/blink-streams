import React from "react";
import TrendingCard from "./TrendingCard";

function FeaturedArticle({ article, onClick, theme }) {
  return (
    <div className={`featured-article ${theme}`}>
      <TrendingCard article={article} type="featured" onClick={onClick} />
    </div>
  );
}

export default FeaturedArticle;
