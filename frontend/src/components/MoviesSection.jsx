// src/components/MoviesSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/MoviesSection.css";

const MoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movies/")
      .then((res) => {
        const data = [...res.data];
        if (data.length > 0) {
          // Shuffle with Fisher-Yates
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
          }
          setMovies(data.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching movies:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading Movies...</p>;
  if (movies.length === 0) return <p>No movies available.</p>;

  return (
    <section className="movies-section">
      <h2 className="section-title">NETFLIX MOVIES</h2>
      <div className="cards-container">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movies/${movie.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={movie.image_url}
              alt={movie.headline}
              className="movie-image"
            />
            <div className="movie-meta">{(movie.eyebrow || "MOVIE").toUpperCase()}</div>
            <h3 className="movie-title">{highlightItalics(movie.headline)}</h3>
            <p className="movie-subtitle">{movie.subheadline || ""}</p>
            <div className="movie-author">
              BY {movie.author} &nbsp;&nbsp; {movie.article_date}
            </div>
          </div>
        ))}
      </div>
      <div
        className="more-link"
        onClick={() => navigate("/movie")}
        style={{ cursor: "pointer" }}
      >
        MORE MOVIES
      </div>
    </section>
  );
};

// Italicize words between *stars*
function highlightItalics(text) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    )
  );
}

export default MoviesSection;
