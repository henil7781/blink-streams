import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/article/${encodeURIComponent(article.article_link)}`}>
        <img src={article.image} alt={article.title} />
        <h3>{article.title}</h3>
      </Link>
    </div>
  );
};

export default ArticleCard;
