import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const values = [
  { icon: '🎯', title: 'Business-First Thinking', desc: 'Every solution we build is measured against one question: does it help your business grow?' },
  { icon: '🔧', title: 'Technology Partnership', desc: "We're invested in your long-term success — we stay with you after launch, not just until delivery." },
  { icon: '⚡', title: 'Speed Without Compromise', desc: 'Modern tools and AI-assisted development mean faster delivery without cutting corners on quality.' },
  { icon: '📊', title: 'Data-Driven Decisions', desc: 'We build systems that surface insights, so you can make smarter decisions as you scale.' },
];

export default function About() {
  return (
    <div className="about page-wrapper">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">About InstaBizWeb</span>
          <h1>Your technology partner for the digital age</h1>
          <p className="page-hero__sub">
            We help businesses grow through technology, automation, and digital solutions —
            positioned as a partner, not just a software vendor.
          </p>
        </div>
      </section>

      <section className="about__story section">
        <div className="container about__story-inner">
          <div className="about__story-text">
            <span className="section-label">Our Story</span>
            <h2>Built on the belief that great technology changes businesses</h2>
            <p>
              InstaBizWeb was founded with a simple but powerful conviction: businesses deserve
              a technology partner that thinks about their growth, not just their current ticket.
              Too many companies get handed a website or software product and left to figure out
              the rest alone.
            </p>
            <p>
              We operate differently. From the first discovery call to ongoing support,
              we act as an extension of your team — understanding your industry, your goals,
              and your customers before we write a single line of code.
            </p>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
              Start a Conversation
            </Link>
          </div>
          <div className="about__story-visual">
            <div className="visual-card">
              <div className="visual-card__stat">
                <span className="big-num">5+</span>
                <span>Years delivering digital solutions</span>
              </div>
              <div className="visual-card__stat">
                <span className="big-num">100+</span>
                <span>Projects across industries</span>
              </div>
              <div className="visual-card__stat">
                <span className="big-num">50+</span>
                <span>Long-term client relationships</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__values section">
        <div className="container">
          <span className="section-label">How We Work</span>
          <h2 className="section-title">Principles we don't compromise on</h2>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-card__icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
