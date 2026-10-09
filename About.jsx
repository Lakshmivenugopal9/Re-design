import React from 'react';

const About = () => {
  return (
    <div className="page about-page" data-testid="about-page">
      <div className="page-header">
        <h1>About MyStore</h1>
        <p>A modern product discovery experience, built for the RE:DESIGN competition.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Welcome to MyStore</h2>
          <p>
            MyStore is a fictional online shopping platform created for the{' '}
            <strong>RE:DESIGN</strong> competition — a challenge to reimagine
            and elevate an existing interface into something genuinely outstanding.
          </p>
          <p>
            Our goal is to make product discovery feel simple, fast, and visually
            delightful.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We strive to provide a straightforward product catalog where users can
            easily browse, search, and order everyday items without unnecessary
            complexity or distractions.
          </p>
          <p>
            Every design decision — from typography to motion — is made with clarity
            and usability in mind.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Curated electronics, accessories, furniture, and home goods.</li>
            <li>Clear and transparent pricing with no hidden charges.</li>
            <li>Fast, keyboard-accessible navigation across all pages.</li>
            <li>A reliable, self-contained shopping experience.</li>
          </ul>
        </section>

        <section className="about-section" id="privacy">
          <h2>Privacy Policy</h2>
          <p>
            Because MyStore is a local demonstration application designed for the
            RE:DESIGN challenge, we do not collect, store, or transmit your personal
            data to any external server or third party. All cart details and form
            inputs remain completely on your local machine.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
