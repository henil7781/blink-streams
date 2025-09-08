import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModel";
import "./../css/Navbar.css";
import logo from "../assets/Logo.png"; // ✅ Correct import


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header
        className={`navbar ${showNavbar ? "show" : "hide"} ${
          location.pathname.startsWith("/trending")
            ? "trending"
            : location.pathname.startsWith("/tv-shows") || location.pathname.startsWith("/shows")
            ? "shows"
            : location.pathname.startsWith("/what-to-watch")
            ? "what-to-watch"
            : location.pathname.startsWith("/movies")
            ? "movies"
            : "default"
        }`}
      >
        <div className="navbar-top">
          <div className="left-section">
            <Link to="/" className="logo">
  <img src={logo} alt="BL!NK Logo" />
</Link>

            <nav className="main-nav desktop-only">
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
                      className={location.pathname === item.to ? "active-link" : ""}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="https://www.netflix.shop/" target="_blank" rel="noopener noreferrer">
                    Shop <span className="external-icon">🔗</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="right-buttons-wrapper">
            <button className="search-button" onClick={() => setIsSearchOpen(true)}>
              <FaSearch />
            </button>
            {user ? (
              <>
                <Link to="/profile" className="user-profile-link">
                  {user.profileImage ? (
                    <img
                      src={`http://localhost:5000${user.profileImage}`}
                      alt="Profile"
                      className="nav-profile-img"
                    />
                  ) : (
                    <>
                      <span className="user-name">👤</span>
                      <span className="user-name">{user.name}</span>
                    </>
                  )}
                </Link>
                {/* <button onClick={handleLogout} className="login-btn">Logout</button> */}
              </>
            ) : (
              <>
                {/* <Link to="/login" className="login-btn">Login</Link> */}
                <Link to="/signup" className="signup-btn">Signup</Link>
              </>
            )}
          </div>

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        </div>

        {menuOpen && (
          <nav className="main-nav open">
            <ul>
              {[
                { to: "/", text: "Home" },
                { to: "/trending", text: "Trending" },
                { to: "/top10", text: "Top 10 " },
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
              <li>
                <a href="https://www.netflix.shop/" target="_blank" rel="noopener noreferrer">
                  Shop <span className="external-icon">🔗</span>
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* <div className="navbar-bottom">
          <ul>
            <li><Link to="/foryou"><strong>For You</strong></Link></li>
            <li><Link to="/ginny-georgia">Ginny & Georgia</Link></li>
            <li><Link to="/kpop-demon-hunters">KPop Demon Hunters</Link></li>
            <li><Link to="/squid-game">Squid Game</Link></li>
            <li><Link to="/untamed"><em>Untamed</em></Link></li>
            <li><Link to="/stranger-things">Stranger Things</Link></li>
            <li><Link to="/old-guard-2">The Old Guard 2</Link></li>
            <li><Link to="/madeas-wedding">Madea’s Destination Wedding</Link></li>
            <li><Link to="/sandman">The Sandman</Link></li>
          </ul>
        </div> */}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
