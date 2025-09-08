// src/components/LatestNews.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../css/LatestNews.css";

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Get data from all 4 endpoints
        const urls = [
          "http://localhost:8000/api/trending-articles/",
          "http://localhost:8000/api/movies/",
          "http://localhost:8000/api/tv-shows/",
          "http://localhost:8000/api/homepage/",
        ];
        let all = [];
        for (const url of urls) {
          const res = await axios.get(url);
          all = all.concat(res.data);
        }

        // Filter where eyebrow contains 'news'
        const newsArticles = all.filter((item) =>
          String(item.eyebrow || "").toLowerCase().includes("news")
        );

        // Shuffle + take 3
        for (let i = newsArticles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newsArticles[i], newsArticles[j]] = [newsArticles[j], newsArticles[i]];
        }
        setNews(newsArticles.slice(0, 5));
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchNews();
  }, []);

  if (!news.length) return null;

  return (
    <section className="latest-news-section">
      <h2 className="latest-news-title">LATEST NEWS</h2>

      {/* MAIN ITEM */}
      <div className="latest-news-content">
        {news.length > 0 && (
          <div className="main-news">
            <img src={news[0].image_url} alt={news[0].headline} className="main-news-img" />
            <h4 className="news-category">{news[0].eyebrow}</h4>
            <h3 className="main-news-title">{news[0].headline}</h3>
            <p className="main-news-sub">{news[0].subheadline}</p>
          </div>
        )}

        {/* SIDE two small */}
        <div className="side-news-list">
          {news.slice(1).map((item, i) => (
            <div key={i} className="side-news-card">
              <img src={item.image_url} alt={item.headline} className="side-news-img" />
              <div className="side-news-text">
                <h4 className="news-category">{item.eyebrow}</h4>
                <h5 className="side-news-title">{item.headline}</h5>
                <span className="news-date">{item.article_date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MORE NEWS */}
      <div className="more-news-link">
        <Link to="/trending" className="more-news-btn">
          MORE NEWS →
        </Link>
      </div>
    </section>
  );
};

export default LatestNews;
