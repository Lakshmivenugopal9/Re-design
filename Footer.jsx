import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>MyStore</h3>
          <p>Online product discovery and shopping, made simple and fast.</p>
        </div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/products">Products</Link>
          <Link to="/about#privacy">Privacy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MyStore — RE:DESIGN Competition Entry</p>
      </div>
    </footer>
  );
};

export default Footer;
