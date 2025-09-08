import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Top10Page from "./pages/Top10";
import CookiesPolicy from "./pages/CookiesPolicy";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
// import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import "./styles/fonts.css";
import ArticlePage from "./pages/ArticlePage";
import Profile from "./pages/Profile";
import WhatToWatch from "./pages/WhatToWatch";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import OtpVerify from "./pages/OtpVerify";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Home is landing page */}
        <Route path="/" element={<Home />} />
       <Route path="/homepage/:id" element={<ArticlePage type="home" />} />

        <Route path="/trending" element={user ? <Trending /> : <Navigate to="/login" />} />

         <Route path="/trending/:id" element={<ArticlePage type="trending" />} />
        <Route path="/what-to-watch/:id" element={<ArticlePage type="watch" />} />
        <Route path="/what-to-watch" element={<WhatToWatch />} />
       <Route path="/tv-shows" element={<Shows />} />
       <Route path="/tv-shows/:id" element={<ArticlePage type="tvshow" />} />
        <Route path="/movies" element={<Movies />} />
       <Route path="/movies/:id" element={<ArticlePage type="movie" />} />
       <Route path="/top10" element={<Top10Page />} />
        
        {/* <Route path="/what-to-watch/:id" element={<WhatToWatchDetail />} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
       <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/tv-shows/*" element={<NotFound />} /> */}

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
