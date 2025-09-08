import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="/">
        <h3>NyteHawk</h3>
        </a>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>

      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/help">Help</a>
      </div>

      <div className="footer-icons">
        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="mailto:support@nytehawk.com"><FaEnvelope /></a>
      </div>
    </footer>
  );
};

export default Footer;
