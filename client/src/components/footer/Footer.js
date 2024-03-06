import React from "react";
import "./Footer.css"; // Make sure to create this CSS file

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About GBTC</h4>
          <p>
            We are a community-driven platform for developers and programmers
            worldwide.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>support@example.com</p>
          <p>+1 234 567 8900</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="http://facebook.com">Facebook</a>
            <a href="http://twitter.com">Twitter</a>
            <a href="http://instagram.com">Instagram</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/terms">Terms of Use</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GBTC - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
