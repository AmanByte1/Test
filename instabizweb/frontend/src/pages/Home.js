import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const offerings = [
  { icon: '🌐', title: 'Website Development', desc: 'Fast, conversion-optimized websites built for modern browsers.' },
  { icon: '📱', title: 'Web & Mobile Apps', desc: 'Cross-platform applications that scale with your business.' },
  { icon: '🤝', title: 'CRM / ERP Solutions', desc: 'Streamline operations with Odoo and custom CRM systems.' },
  { icon: '🤖', title: 'AI & Automation', desc: 'Intelligent workflows that reduce manual effort and cost.' },
  { icon: '📣', title: 'Digital Marketing', desc: 'Data-driven campaigns that drive traffic and qualified leads.' },
];

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Services Offered' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="container hero__content">
          <span className="section-label">Digital Solutions for Business Growth</span>
          <h1 className="hero__title">
            We build tech that<br />
            <span className="hero__accent">grows your business</span>
          </h1>
          <p className="hero__sub">
            InstaBizWeb is your technology partner — not just a vendor.
            From websites and apps to CRM, ERP, AI automation, and digital marketing,
            we deliver end-to-end digital solutions tailored to your goals.
          </p>
          <div className="hero__cta">
            <Link to="/contact" className="btn-primary">Book a Consultation</Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-bar__inner">
          {stats.map(s => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Offerings */}
      <section className="offerings section">
        <div className="container">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">One partner for your entire digital journey</h2>
          <div className="offerings__grid">
            {offerings.map(o => (
              <div key={o.title} className="offering-card">
                <span className="offering-card__icon">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="offerings__cta">
            <Link to="/services" className="btn-outline">See All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner section">
        <div className="container cta-banner__inner">
          <div>
            <h2>Ready to grow your business digitally?</h2>
            <p>Let's discuss your project — no obligation, no sales pressure.</p>
          </div>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
