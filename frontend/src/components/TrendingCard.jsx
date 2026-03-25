import React from "react";
import "../css/Trending.css";

function TrendingCard({ article, onClick, type = "explore" }) {
  return (
    <div className={`${type}-card`} onClick={() => onClick(article.id)}>
      <img src={article.image_url} alt={article.headline} />
      <p className="category">{article.eyebrow || "NEWS"}</p>

      {type === "featured" ? (
        <h2 dangerouslySetInnerHTML={{ __html: article.headline }} />
      ) : type === "popular" ? (
        <h3 dangerouslySetInnerHTML={{ __html: article.headline }} />
      ) : (
        <h4 dangerouslySetInnerHTML={{ __html: article.headline }} />
      )}

      <p className="subheadline">{article.subheadline}</p>
      <p className="author-date">
        {article.author !== "NO AUTHOR MENTIONED"
          ? `${article.author} • ${article.article_date}`
          : article.article_date}
      </p>
    </div>
  );
}

export default TrendingCard;
