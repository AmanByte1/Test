import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="brand-box">IBW</span>
            <span className="brand-name">InstaBizWeb</span>
          </div>
          <p className="footer__tagline">
            Digital Solutions for Business Growth.<br />
            Your technology partner, not just a vendor.
          </p>
          <div className="footer__contact-info">
            <span>📧 info@instabizweb.com</span>
            <span>📞 6355312073</span>
          </div>
        </div>

        <div className="footer__col">
          <h4>Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/why-us">Why Choose Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li>Website Development</li>
            <li>Web & Mobile Apps</li>
            <li>CRM Solutions</li>
            <li>ERP & Odoo</li>
            <li>AI Automation</li>
            <li>Digital Marketing</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} InstaBizWeb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
