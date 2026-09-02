import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    icon: '🌐',
    title: 'Website Development',
    desc: 'Professional, high-performance websites built with modern frameworks. We focus on speed, SEO, and conversion — not just aesthetics.',
    tags: ['React', 'Next.js', 'WordPress', 'SEO-Ready'],
  },
  {
    icon: '📱',
    title: 'Web & Mobile App Development',
    desc: 'Full-stack applications for web and mobile platforms. From MVPs to enterprise-scale products, we architect for growth.',
    tags: ['React Native', 'Flutter', 'Node.js', 'REST APIs'],
  },
  {
    icon: '🤝',
    title: 'CRM Solutions',
    desc: 'Custom CRM systems and integrations that centralize your customer data, improve sales pipelines, and boost retention.',
    tags: ['Custom CRM', 'Salesforce', 'HubSpot', 'Integration'],
  },
  {
    icon: '🏢',
    title: 'ERP & Odoo Solutions',
    desc: 'Streamline your entire business with Odoo ERP — from accounting and inventory to HR and project management.',
    tags: ['Odoo', 'Custom ERP', 'Module Dev', 'Migration'],
  },
  {
    icon: '💻',
    title: 'Custom Software Development',
    desc: 'Bespoke software built around your exact workflows. If off-the-shelf tools don\'t fit, we build what does.',
    tags: ['Full Stack', 'Microservices', 'Cloud Native', 'API Design'],
  },
  {
    icon: '⚙️',
    title: 'Business Process Automation',
    desc: 'Identify bottlenecks, eliminate repetitive tasks, and free your team to focus on high-value work through intelligent automation.',
    tags: ['Workflow Automation', 'RPA', 'Zapier', 'n8n'],
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    desc: 'Integrate AI into your operations — chatbots, document processing, predictive analytics, and LLM-powered tools.',
    tags: ['LLM Integration', 'AI Chatbots', 'ML Models', 'OpenAI API'],
  },
  {
    icon: '🔗',
    title: 'API & System Integration',
    desc: 'Connect your existing tools and platforms so data flows seamlessly. We design and build robust APIs and integration layers.',
    tags: ['REST APIs', 'GraphQL', 'Webhooks', 'Third-party APIs'],
  },
  {
    icon: '📣',
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies — SEO, paid ads, content, email, and social — that generate real, measurable ROI.',
    tags: ['SEO', 'Google Ads', 'Social Media', 'Email Marketing'],
  },
];

export default function Services() {
  return (
    <div className="services page-wrapper">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h1>Services built around your business goals</h1>
          <p className="page-hero__sub">
            Nine specialisms, one team, one accountable partner. Pick what you need now
            and scale as you grow.
          </p>
        </div>
      </section>

      <section className="services__grid-section section">
        <div className="container">
          <div className="services__grid">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <span className="service-card__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-card__tags">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services__cta section">
        <div className="container services__cta-inner">
          <h2>Not sure which service fits your needs?</h2>
          <p>Book a free 30-minute discovery call and we'll map out the right solution together.</p>
          <Link to="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
}
