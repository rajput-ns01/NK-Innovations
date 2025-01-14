import React from 'react';
import '../styles/styles.css'; // Import CSS file for Footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>NK Innovation is dedicated to advancing robotics and AI technology through specialized talent solutions. Our commitment to excellence ensures that our teams are at the forefront of creating impactful solutions for the future.</p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> +1 (123) 456-7890</span>
              <span><i className="fas fa-envelope"></i> info@nkinnovation.com</span>
            </div>
            <div className="social-media">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-section quick-links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/solutions">Solutions</a></li>
            </ul>
          </div>
          
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} NK Innovation. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
