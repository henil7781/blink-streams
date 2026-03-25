import React from "react";
import { Link } from "react-router-dom";
import "../css/NotFound.css";
import flashlightImg from "../assets/flashlight.png";  // <-- Make sure to import your image

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <img src={flashlightImg} className="flashlight-img" alt="flashlight" />
      <div className="notfound-content">
        <h1>LOST YOUR WAY?</h1>
        <p>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>

        <Link to="/" className="back-btn">Back to home</Link>
      </div>
    </div>
  );
};

export default NotFound;
