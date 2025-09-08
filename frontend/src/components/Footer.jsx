// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Footer.css";
import logo from "../assets/Logo.png"; // ✅ Correct import

export default function Footer() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <footer className="blink-footer">
      {/* top curve */}
      <div className="curve-bg"></div>

      <div className="footer-content">
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back To Top
        </button>

        <div className="center-links">
          <Link to="/" className="logo">
           <img src={logo} alt="BL!NK Logo" />
         </Link>
         
          <ul className="footer-links">
            {/* <li>ABOUT US</li>
            <li>BL!NK HOUSE</li>
            <li>BL!NK SHOP</li>
            <li>PODCASTS</li> */}
          </ul>
        </div>

        {/* ACCOUNT AREA */}
        <div className="footer-auth">
          {user ? (
            <>
              <Link to="/profile" className="profile-footer-link">
                {user.profileImage ? (
                  <img
                    src={`http://localhost:5000${user.profileImage}`}
                    alt="Profile"
                    className="footer-profile-img"
                  />
                ) : (
                    <>
                  <span className="footer-user-icon">👤</span>
                <span className="footer-user-name">{user.name}</span>
</>
                )}
              </Link>
              <button onClick={handleLogout} className="footer-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <div className="footer-login-row">
              <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </div>

   <div className="legal-row">
  <Link to="/">Home</Link>
  <Link to="/privacy-policy">Privacy</Link>
  <Link to="/terms">Terms Of Use</Link>
  <Link to="/cookies-policy">Cookies</Link>
  <span>© 2025 BL!NK</span>
</div>
    </footer>
  );
}
