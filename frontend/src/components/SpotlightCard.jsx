import React from "react";
import "../css/SpotlightSection.css";

function SpotlightCard({ article }) {
  return (
    <div className="spotlight-card">
      <img
        src={article.image_url}
        alt={article.headline}
        className="spotlight-img"
      />
      <p className="spotlight-category">{article.eyebrow || "NEWS"}</p>
      <h2
        className="spotlight-headline"
        dangerouslySetInnerHTML={{ __html: article.headline }}
      />
      <p className="spotlight-desc">{article.subheadline || ""}</p>
      <p className="spotlight-author">
        BY {article.author}
        <span className="spotlight-date">{article.article_date}</span>
      </p>
    </div>
  );
}

export default SpotlightCard;
