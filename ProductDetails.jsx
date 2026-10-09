import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="page product-not-found" data-testid="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary" data-testid="back-to-products">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleAddToCart = () => addToCart(product, quantity);

  // Related products (same category, excluding this one)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="page product-details-page" data-testid="product-details-page">

      {/* Breadcrumb */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/products">Products</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      {/* Main detail card */}
      <div className="product-details-container">
        <div className="product-details-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="large-product-image"
            data-testid="detail-image"
          />
        </div>

        <div className="product-details-info-section">
          <span className="product-details-category" data-testid="detail-category">
            {product.category}
          </span>

          <h1 className="product-details-title" data-testid="detail-title">
            {product.name}
          </h1>

          <p className="product-details-price" data-testid="detail-price">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="product-details-description" data-testid="detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-details-quantity">
            <label htmlFor="detail-qty">Quantity</label>
            <div className="quantity-controls" id="detail-qty">
              <button
                type="button"
                className="btn btn-qty quantity-decrease"
                data-testid="quantity-decrease"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-display" data-testid="quantity-display">
                {quantity}
              </span>
              <button
                type="button"
                className="btn btn-qty quantity-increase"
                data-testid="quantity-increase"
                onClick={handleIncrease}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-details-actions">
            <button
              type="button"
              className="btn btn-primary add-to-cart"
              data-testid="add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
            </button>
            <Link
              to="/products"
              className="btn btn-secondary back-to-products"
              data-testid="back-to-products"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ marginTop: 'var(--space-12)' }}>
          <div className="section-header" style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--clr-text)'
            }}>
              More in {product.category}
            </h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <div key={p.id} className="product-card" data-testid="product-card">
                <div className="product-card-image-wrapper">
                  <img src={p.image} alt={p.name} className="product-card-image" loading="lazy" />
                </div>
                <div className="product-card-body">
                  <span className="product-card-category">{p.category}</span>
                  <h3 className="product-card-title">{p.name}</h3>
                  <p className="product-card-price">₹{p.price.toLocaleString('en-IN')}</p>
                  <div className="product-card-actions">
                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-secondary view-details"
                      data-testid="view-details"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetails;
