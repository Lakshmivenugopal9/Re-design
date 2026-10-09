import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems, notification } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="navbar-header">
      <nav className="navbar" data-testid="navbar">
        <div className="nav-brand">
          <Link to="/" className="brand-logo" data-testid="brand-logo">
            MyStore
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id="nav-menu"
          className={`nav-links${menuOpen ? ' open' : ''}`}
        >
          <li>
            <NavLink
              to="/"
              end
              data-testid="nav-home"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              data-testid="nav-products"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              data-testid="nav-about"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              data-testid="nav-contact"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              data-testid="nav-cart"
              className={({ isActive }) =>
                isActive ? 'nav-link cart-link active' : 'nav-link cart-link'
              }
            >
              Cart&nbsp;
              <span data-testid="cart-count">({totalItems})</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {notification && (
        <div className="notification-banner" data-testid="notification-banner">
          ✓ {notification}
        </div>
      )}
    </header>
  );
};

export default Navbar;
