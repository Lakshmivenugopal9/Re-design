import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFormErrors({});
  };

  return (
    <div className="page contact-page" data-testid="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Send your queries, feedback, or suggestions to the MyStore team.</p>
      </div>

      <div className="contact-container">
        {submitted && (
          <div className="alert alert-success" data-testid="contact-success-message">
            <p><strong>Message sent successfully!</strong></p>
            <p>Thank you for reaching out. We will get back to you shortly.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 'var(--space-3)' }}
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        )}

        <form
          className="contact-form"
          data-testid="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className={formErrors.name ? 'form-input error' : 'form-input'}
              value={formData.name}
              onChange={handleInputChange}
              data-testid="contact-name"
              placeholder="Your Name"
              autoComplete="name"
            />
            {formErrors.name && (
              <span className="error-text" data-testid="contact-error-name">
                {formErrors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className={formErrors.email ? 'form-input error' : 'form-input'}
              value={formData.email}
              onChange={handleInputChange}
              data-testid="contact-email"
              placeholder="Your Email"
              autoComplete="email"
            />
            {formErrors.email && (
              <span className="error-text" data-testid="contact-error-email">
                {formErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              className={formErrors.subject ? 'form-input error' : 'form-input'}
              value={formData.subject}
              onChange={handleInputChange}
              data-testid="contact-subject"
              placeholder="Subject"
            />
            {formErrors.subject && (
              <span className="error-text" data-testid="contact-error-subject">
                {formErrors.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              className={formErrors.message ? 'form-input error' : 'form-input'}
              value={formData.message}
              onChange={handleInputChange}
              data-testid="contact-message"
              placeholder="Write your message here…"
            />
            {formErrors.message && (
              <span className="error-text" data-testid="contact-error-message">
                {formErrors.message}
              </span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary contact-submit"
              data-testid="contact-submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
