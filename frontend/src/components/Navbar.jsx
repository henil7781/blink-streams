import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModel";
import "./../css/Navbar.css";
import logo from "../assets/Logo.png"; // ✅ Correct import


const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <>
      <header className={`navbar ${showNavbar ? "show" : "hide"}`}>
        {/* Top Row: Sign In and Logo */}
        <div className="navbar-top-row">
          <div className="left-section">
            {user ? (
              <div className="user-profile-nav">
                <Link to="/profile" className="profile-link">
                  {user.profileImage ? (
                    <img 
                      src={`http://localhost:5000${user.profileImage}`} 
                      alt="Profile" 
                      className="navbar-profile-img" 
                    />
                  ) : (
                    <span className="profile-initials">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="user-firstname">{user.name.split(" ")[0]}</span>
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="signin-btn">
                  Sign In
                </Link>
                <Link to="/signup" className="join-btn">
                  Join
                </Link>
              </>
            )}
          </div>
          <div className="center-section">
            <Link to="/" className="tudum-logo">
              TUDUM
            </Link>
          </div>
          <div className="right-section">
            <button className="search-button-tudum" onClick={() => setIsSearchOpen(true)}>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Middle Row: Primary Navigation */}
        <nav className="navbar-mid-row desktop-only">
          <ul className="nav-links">
            {[
              { to: "/", text: "HOME" },
              { to: "/top10", text: "TOP 10" },
              { to: "/trending", text: "TRENDING" },
              { to: "/what-to-watch", text: "WHAT TO WATCH" },
              { to: "/tv-shows", text: "SHOWS" },
              { to: "/movies", text: "MOVIES" },
              { to: "/puzzled", text: "PUZZLED" },
              { to: "/podcasts", text: "PODCASTS" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={location.pathname === item.to ? "active-link" : ""}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://www.netflix.shop/" target="_blank" rel="noopener noreferrer">
                SHOP 🔗
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom Row: Popular Ticker */}
        <div className="navbar-bottom-row">
          <div className="ticker-label">POPULAR</div>
          <div className="ticker-separator">|</div>
          <div className="ticker-content">
            <div className="ticker-item">BTS THE COMEBACK LIVE | ARIRANG</div>
            <div className="ticker-item">Beauty in Black</div>
            <div className="ticker-item">War Machine</div>
            <div className="ticker-item">ONE PIECE</div>
            <div className="ticker-item">Virgin River</div>
            <div className="ticker-item">Bridgerton</div>
            <div className="ticker-item">Stranger Things</div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

        {menuOpen && (
          <nav className="main-nav open">
            <ul>
              {[
                { to: "/", text: "Home" },
                { to: "/trending", text: "Trending" },
                { to: "/top10", text: "Top 10" },
                { to: "/what-to-watch", text: "What to Watch" },
                { to: "/tv-shows", text: "Shows" },
                { to: "/movies", text: "Movies" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={location.pathname === item.to ? "active-link" : ""}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
