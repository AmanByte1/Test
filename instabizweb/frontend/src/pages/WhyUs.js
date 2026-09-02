import React from 'react';
import { Link } from 'react-router-dom';
import './WhyUs.css';

const reasons = [
  {
    num: '01',
    title: 'Customized Solutions',
    desc: 'We never sell you a template and call it a solution. Every project starts with your specific goals, constraints, and customers — and the output reflects that.',
  },
  {
    num: '02',
    title: 'Business-Focused Development',
    desc: 'Code is a means, not an end. We measure success by business outcomes — leads generated, time saved, revenue earned — not lines of code written.',
  },
  {
    num: '03',
    title: 'Modern Technology Stack',
    desc: 'We use current, well-supported tools: React, Node.js, cloud infrastructure, and AI integrations that keep your systems maintainable and competitive.',
  },
  {
    num: '04',
    title: 'Automation First',
    desc: 'We actively look for ways to automate repetitive tasks inside your business, freeing up your team for higher-value work from day one.',
  },
  {
    num: '05',
    title: 'Built to Scale',
    desc: "We architect for where you're going, not just where you are today. Scalable databases, modular code, and cloud-native infrastructure are our defaults.",
  },
  {
    num: '06',
    title: 'End-to-End Support',
    desc: 'From discovery to design to deployment to ongoing maintenance — one team handles everything so nothing falls through the cracks.',
  },
];

const testimonials = [
  {
    quote: 'InstaBizWeb transformed how our sales team works. The CRM they built cut our admin time in half.',
    name: 'Priya S.',
    role: 'CEO, RetailTech Startup',
  },
  {
    quote: 'They delivered a fully automated order management system in under 6 weeks. Highly recommended.',
    name: 'Rahul M.',
    role: 'Operations Head, E-Commerce Brand',
  },
  {
    quote: "Our Odoo implementation was smooth and the team stayed available long after go-live. That's rare.",
    name: 'Anjali K.',
    role: 'Director, Manufacturing Firm',
  },
];

export default function WhyUs() {
  return (
    <div className="why-us page-wrapper">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Why Choose InstaBizWeb</span>
          <h1>The partner that stays accountable after delivery</h1>
          <p className="page-hero__sub">
            Lots of agencies build things. Few stay involved, stay honest, and stay focused
            on your actual business results.
          </p>
        </div>
      </section>

      <section className="reasons section">
        <div className="container">
          <div className="reasons__grid">
            {reasons.map(r => (
              <div key={r.num} className="reason-card">
                <span className="reason-card__num">{r.num}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials section">
        <div className="container">
          <span className="section-label">What Clients Say</span>
          <h2 className="section-title">Proof in practice, not in promises</h2>
          <div className="testimonials__grid">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-cta section">
        <div className="container why-cta__inner">
          <h2>Let's build something that actually moves the needle</h2>
          <Link to="/contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </div>
  );
}
