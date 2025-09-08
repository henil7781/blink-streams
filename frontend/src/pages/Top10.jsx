// src/pages/Top10Page.jsx
import React, { useState } from "react";
import Top10Section from "../components/Top10_Section";
import "../css/Top10.css";

export default function Top10Page() {
  const [country, setCountry] = useState("global");
  const [type, setType] = useState("films");

  return (
    <div className="top10-page">
      <h1 className="top-title">Top 10 Rankings</h1>

      <div className="top-subtitle">
        Choose your country and preferred category
      </div>

      <div className="filters">
        <select className="filter-select" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="global">🌍 Global</option>
          <option value="india">🇮🇳 India</option>
          <option value="us">🇺🇸 USA</option>
          <option value="uk">🇬🇧 UK</option>
          <option value="brazil">🇧🇷 Brazil</option>
        </select>

        <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="films">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      </div>

      <Top10Section country={country} type={type} />
    </div>
  );
}
