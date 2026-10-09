import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item" data-testid="cart-item">
      <div className="cart-item-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
        />
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.name}</h4>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')} each</p>
      </div>

      <div className="cart-item-total">
        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
        <div className="cart-item-actions">
          <button
            type="button"
            className="btn btn-danger remove-item"
            data-testid="remove-item"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="cart-item-quantity-controls">
        <label>Quantity</label>
        <div className="quantity-buttons">
          <button
            type="button"
            className="btn btn-qty quantity-decrease"
            data-testid="quantity-decrease"
            onClick={() => decreaseQuantity(item.id)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-number" data-testid="quantity-display">
            {item.quantity}
          </span>
          <button
            type="button"
            className="btn btn-qty quantity-increase"
            data-testid="quantity-increase"
            onClick={() => increaseQuantity(item.id)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
