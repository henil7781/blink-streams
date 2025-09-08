import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ArticlePage.css";

const ArticlePage = ({ type }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Map type -> API URL
  const apiUrls = {
    trending: `http://localhost:8000/api/trending-articles/${id}/`,
    watch: `http://localhost:8000/api/what-to-watch/${id}/`,
    tvshow: `http://localhost:8000/api/tv-shows/${id}/`,
    home:`http://localhost:8000/api/homepage/${id}/`,
    movie:`http://localhost:8000/api/movies/${id}/`,

  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(apiUrls[type]);
        setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Could not load the article.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, type]);

  if (loading) return <p className="loading">Loading article...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!article) return <p className="error">No article found.</p>;

  // Parse headings safely
  let headings = [];
  try {
    headings = article.article_headings
      ? JSON.parse(article.article_headings.replace(/'/g, '"'))
      : [];
  } catch {
    headings = article.article_headings
      ? article.article_headings
          .replace(/^\[|\]$/g, "")
          .split(/',\s*'/)
          .map((h) => h.replace(/^'|'$/g, "").trim())
          .filter((h) => h.length > 0)
      : [];
  }

  // Parse images safely
  let images = [];
  try {
    images = article.article_image
      ? JSON.parse(article.article_image.replace(/'/g, '"'))
      : [];
  } catch {
    images = article.article_image
      ? article.article_image
          .replace(/^\[|\]$/g, "")
          .split(/',\s*'/)
          .map((img) => img.replace(/^'|'$/g, "").trim())
          .filter((img) => img.length > 0)
      : [];
  }

  // Group sentences into paragraphs
  const sentences = article.article_data
    ? article.article_data
        .split(/\. (?=[A-Z])/)
        .map((s) => s.trim() + ".")
        .filter((s) => s.length > 1)
    : [];

  const paragraphs = [];
  for (let i = 0; i < sentences.length; i +=1) {
    paragraphs.push(sentences.slice(i, i + 3).join(" "));
  }

  return (
    <div className="article-container">
      <div className="article-header">
        {article.eyebrow && <span className="eyebrow">{article.eyebrow}</span>}
        <h1 className="headline">{article.headline}</h1>
        {article.subheadline && (
          <p className="subheadline">{article.subheadline}</p>
        )}
        <p className="author-date">
          {article.author} • {article.article_date}
        </p>
      </div>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.headline}
          className="article-main-img"
        />
      )}

      <div className="article-body">
        {paragraphs.map((para, idx) => (
          <div key={idx} className="article-section">
            {headings[idx] && <h2>{headings[idx]}</h2>}
            <p>{para}</p>
            {images[idx] && (
              <img
                src={images[idx]}
                alt={`section-${idx}`}
                className="article-section-img"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
