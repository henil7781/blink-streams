import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleBySlug } from "../api/api";

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleBySlug(slug)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error("Error loading article:", err));
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} className="article-image" />
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleDetail;
