import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/SearchModal.css";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const apiUrls = {
    trending: "http://localhost:8000/api/trending-articles/",
    watch: "http://localhost:8000/api/what-to-watch/",
    tvshow: "http://localhost:8000/api/tv-shows/",
    home: "http://localhost:8000/api/homepage/",
    movie: "http://localhost:8000/api/movies/",
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      let allResults = [];

      // fetch from all endpoints
      const requests = Object.entries(apiUrls).map(async ([source, url]) => {
        const res = await axios.get(url);
        const filtered = res.data.filter((item) =>
          [item.headline, item.subheadline, item.eyebrow, item.writer]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        return filtered.map((f) => ({ ...f, source }));
      });

      const resolved = await Promise.all(requests);
      allResults = resolved.flat();

      setResults(allResults);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };
const handleResultClick = (id, source) => {
  onClose();

  switch (source) {
    case "home":
      navigate(`/homepage/${id}`);
      break;

    case "movie":
      navigate(`/movies/${id}`);
      break;

    case "tvshow":
      navigate(`/tv-shows/${id}`);
      break;

    case "trending":
      navigate(`/trending/${id}`);
      break;

    case "watch":
      navigate(`/what-to-watch/${id}`);
      break;

    default:
      navigate(`/article/${id}`); // fallback if source not matched
  }
};


  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        {/* Header */}
        <div className="search-modal-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="search-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {results.length === 0 ? (
            <p style={{ padding: "12px", color: "rgba(255,255,255,0.6)" }}>
              Type something and press Enter to search...
            </p>
          ) : (
            results.map((article) => (
              <div
                key={`${article.source}-${article.id}`}
                className="search-result"
                onClick={() => handleResultClick(article.id, article.source)}
              >
                <div className="search-result-info">
                  <div className="search-result-type">
                    {article.type?.toUpperCase() || article.source.toUpperCase()}
                  </div>
                  <div className="search-result-title">{article.headline}</div>
                </div>
                {article.image_url && (
                  <img
                    className="search-result-img"
                    src={article.image_url}
                    alt={article.headline}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
