import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, totalItems, subtotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateCheckoutForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) errors.address = 'Address is required';
    return errors;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const errors = validateCheckoutForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setOrderPlaced(true);
    clearCart();
    setShowCheckout(false);
  };

  return (
    <div className="page cart-page" data-testid="cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      {orderPlaced ? (
        <div className="order-success-card" data-testid="order-success-message">
          <div className="success-icon">✓</div>
          <h2>Order placed successfully!</h2>
          <p>Thank you for shopping with MyStore. Your order has been received.</p>
          <div className="success-actions">
            <Link
              to="/products"
              className="btn btn-primary"
              data-testid="continue-shopping-success"
              onClick={() => setOrderPlaced(false)}
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      ) : cartItems.length === 0 ? (
        <div className="empty-cart-container" data-testid="empty-cart-message">
          <p style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>🛒</p>
          <p>Your shopping cart is empty.</p>
          <Link
            to="/products"
            className="btn btn-primary continue-shopping"
            data-testid="continue-shopping"
          >
            Browse Products
          </Link>
        </div>

      ) : (
        <div className="cart-content-wrapper">
          <div className="cart-items-list" data-testid="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary-box" data-testid="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items</span>
              <span data-testid="cart-total-items">{totalItems}</span>
            </div>
            <div className="summary-row subtotal-row">
              <strong>Total</strong>
              <strong
                className="subtotal-amount"
                data-testid="cart-subtotal"
              >
                ₹{subtotal.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="cart-summary-actions">
              <Link
                to="/products"
                className="btn btn-secondary continue-shopping"
                data-testid="continue-shopping"
              >
                ← Continue Shopping
              </Link>
              {!showCheckout && (
                <button
                  type="button"
                  className="btn btn-primary checkout-button"
                  data-testid="checkout-button"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>

          {showCheckout && (
            <div className="checkout-section" data-testid="checkout-section">
              <h2>Checkout Details</h2>
              <form
                className="checkout-form"
                data-testid="checkout-form"
                onSubmit={handleCheckoutSubmit}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="checkout-name">Full Name</label>
                  <input
                    type="text"
                    id="checkout-name"
                    name="name"
                    className={formErrors.name ? 'form-input error' : 'form-input'}
                    value={formData.name}
                    onChange={handleInputChange}
                    data-testid="checkout-name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {formErrors.name && (
                    <span className="error-text" data-testid="checkout-error-name">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-email">Email Address</label>
                  <input
                    type="email"
                    id="checkout-email"
                    name="email"
                    className={formErrors.email ? 'form-input error' : 'form-input'}
                    value={formData.email}
                    onChange={handleInputChange}
                    data-testid="checkout-email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <span className="error-text" data-testid="checkout-error-email">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="checkout-phone"
                    name="phone"
                    className={formErrors.phone ? 'form-input error' : 'form-input'}
                    value={formData.phone}
                    onChange={handleInputChange}
                    data-testid="checkout-phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                  {formErrors.phone && (
                    <span className="error-text" data-testid="checkout-error-phone">
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-address">Delivery Address</label>
                  <textarea
                    id="checkout-address"
                    name="address"
                    rows="3"
                    className={formErrors.address ? 'form-input error' : 'form-input'}
                    value={formData.address}
                    onChange={handleInputChange}
                    data-testid="checkout-address"
                    placeholder="Enter your delivery address"
                    autoComplete="street-address"
                  />
                  {formErrors.address && (
                    <span className="error-text" data-testid="checkout-error-address">
                      {formErrors.address}
                    </span>
                  )}
                </div>

                <div className="form-actions checkout-actions">
                  <button
                    type="submit"
                    className="btn btn-primary checkout-submit"
                    data-testid="checkout-submit"
                  >
                    Place Order — ₹{subtotal.toLocaleString('en-IN')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary cancel-checkout"
                    data-testid="cancel-checkout"
                    onClick={() => setShowCheckout(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
