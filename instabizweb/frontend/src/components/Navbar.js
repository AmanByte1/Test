import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/why-us', label: 'Why Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="brand-box">IBW</span>
          <span className="brand-name">InstaBizWeb</span>
        </Link>

        <ul className={`navbar__links${open ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={location.pathname === l.to ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="btn-primary nav-cta">Book a Consultation</Link>
          </li>
        </ul>

        <button
          className="navbar__burger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={open ? 'bar open' : 'bar'} />
          <span className={open ? 'bar open' : 'bar'} />
          <span className={open ? 'bar open' : 'bar'} />
        </button>
      </div>
    </nav>
  );
}
