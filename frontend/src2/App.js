// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainHome from './components/MainHome';
import Services from './components/Services';
import About from './components/About';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { Navigate } from 'react-router-dom';


function App() {
  const isLoggedIn = localStorage.getItem('nytehawk-user');// ✅ check login status

  return (
    <Router>
      <Routes>
        {/* Root route decision */}
        <Route
  path="/"
  element={
    localStorage.getItem('nytehawk-user') ? (
      <Navigate to="/home" replace />
    ) : (
      <LandingPage />
    )
  }
/>


        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App routes after login */}
        <Route path="/home" element={
          <>
            <Navbar />
            <MainHome />
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Navbar />
            <Services />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/help" element={
          <>
            <Navbar />
            <Help />
            <Footer />
          </>
        } />
        {/* <Route path="/profile" element={
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        } /> */}
        <Route
  path="/profile"
  element={
    localStorage.getItem('nytehawk-user') ? (
      <>
        <Navbar />
        <Profile />
        <Footer />
      </>
    ) : (
      <Navigate to="/" />
    )
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
