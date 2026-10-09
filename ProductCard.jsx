import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const cardRef = useRef(null);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // Subtle 3D tilt on mouse move
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className="product-card"
      data-testid="product-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-price">₹{product.price.toLocaleString('en-IN')}</p>
        <div className="product-card-actions">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-secondary view-details"
            data-testid="view-details"
          >
            Details
          </Link>
          <button
            type="button"
            className="btn btn-primary add-to-cart"
            data-testid="add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
