import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const services = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  service: '',
  message: '',
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (!form.companyName.trim()) errors.companyName = 'Company name is required.';
  if (!form.service) errors.service = 'Please select a service.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [serverError, setServerError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    setServerError('');

    try {
      const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      await axios.post(`${API}/enquiries`, form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setServerError(
        err.response?.data?.message || 'Something went wrong. Please try again or email us directly.'
      );
    }
  };

  return (
    <div className="contact page-wrapper">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1>Tell us about your project</h1>
          <p className="page-hero__sub">
            Fill in the form and we'll get back to you within one business day.
          </p>
        </div>
      </section>

      <section className="contact__section section">
        <div className="container contact__inner">

          <div className="contact__info">
            <h3>What happens next?</h3>
            <div className="contact__steps">
              <div className="contact__step">
                <span className="step-num">1</span>
                <div>
                  <strong>We review your enquiry</strong>
                  <p>Our team reads every submission within one business day.</p>
                </div>
              </div>
              <div className="contact__step">
                <span className="step-num">2</span>
                <div>
                  <strong>Discovery call</strong>
                  <p>We schedule a 30-minute call to understand your needs in depth.</p>
                </div>
              </div>
              <div className="contact__step">
                <span className="step-num">3</span>
                <div>
                  <strong>Proposal & timeline</strong>
                  <p>You receive a clear scope, timeline, and investment breakdown.</p>
                </div>
              </div>
            </div>
            <div className="contact__direct">
              <h4>Prefer to reach out directly?</h4>
              <a href="mailto:info@instabizweb.com">info@instabizweb.com</a>
              <a href="tel:6355312073">6355312073</a>
            </div>
          </div>

          <div className="contact__form-wrap">
            {status === 'success' ? (
              <div className="form-success">
                <span className="success-icon">✅</span>
                <h3>Enquiry submitted!</h3>
                <p>Thanks for reaching out. We'll be in touch within one business day.</p>
                <button className="btn-outline" onClick={() => setStatus(null)}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName" name="fullName" type="text"
                      placeholder="Your full name"
                      value={form.fullName} onChange={handleChange}
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="you@company.com"
                      value={form.email} onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone} onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name *</label>
                    <input
                      id="companyName" name="companyName" type="text"
                      placeholder="Your company"
                      value={form.companyName} onChange={handleChange}
                      className={errors.companyName ? 'error' : ''}
                    />
                    {errors.companyName && <span className="field-error">{errors.companyName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interested In *</label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span className="field-error">{errors.service}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Tell us about your project, goals, or questions…"
                    value={form.message} onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="form-error-banner">{serverError}</div>
                )}

                <button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Submitting…' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
