import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

// Simple scroll-reveal hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useReveal();
  const searchRef = useReveal();
  const featuredRef = useReveal();

  const handleSearchSubmit = (term) => {
    if (term.trim()) {
      navigate(`/products?search=${encodeURIComponent(term.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const featured = products.slice(0, 6);
  const displayedProducts = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : featured;

  // Category counts
  const catCounts = categories.slice(1).map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="page home-page" data-testid="home-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="hero-section reveal"
        data-testid="hero-section"
      >
        <h1 className="hero-title">
          Discover products<br />
          <span>you'll love.</span>
        </h1>
        <p className="hero-subtitle">
          Premium picks across electronics, furniture, accessories, and more —
          all in one place.
        </p>
        <div className="hero-actions">
          <Link
            to="/products"
            className="btn btn-primary shop-now-btn"
            data-testid="shop-now-button"
          >
            Shop Now
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{products.length}</span>
            <span className="hero-stat-label">Products</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{categories.length - 1}</span>
            <span className="hero-stat-label">Categories</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">₹399</span>
            <span className="hero-stat-label">Starting from</span>
          </div>
        </div>
      </section>

      {/* ── Quick Search ─────────────────────────────────────── */}
      <section ref={searchRef} className="home-search-section reveal">
        <h2>Quick Search</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearchSubmit}
        />
        {searchTerm.trim() && (
          <p className="search-status-note">
            Showing results below — press Search to see all matches in Products.
          </p>
        )}
      </section>

      {/* ── Category chips ───────────────────────────────────── */}
      {!searchTerm.trim() && (
        <div className="category-chips">
          {catCounts.map(({ name, count }) => (
            <Link
              key={name}
              to={`/products?search=${encodeURIComponent(name)}`}
              className="category-chip"
            >
              {name}
              <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>{count}</span>
            </Link>
          ))}
        </div>
      )}

      {/* ── Featured Products ────────────────────────────────── */}
      <section
        ref={featuredRef}
        className="featured-section stagger-children reveal"
        data-testid="featured-products"
      >
        <div className="section-header">
          <h2>{searchTerm.trim() ? 'Search Results' : 'Featured Products'}</h2>
          {!searchTerm.trim() && (
            <Link to="/products" className="view-all-link">
              View all {products.length} products →
            </Link>
          )}
        </div>

        {displayedProducts.length === 0 ? (
          <p className="no-products-msg" data-testid="no-products-message">
            No products found matching "{searchTerm}".
          </p>
        ) : (
          <div className="product-grid" data-testid="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
