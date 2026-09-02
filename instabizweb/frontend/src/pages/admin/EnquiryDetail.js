import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import './EnquiryDetail.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SERVICES = [
  'Website Development','Web/Mobile App Development','CRM','ERP/Odoo',
  'Custom Software','Business Automation','AI Automation','API Integration',
  'Digital Marketing','Other',
];
const STATUSES = ['New','In Review','Contacted','Closed'];

const statusColor = s => ({
  'New': '#3b82f6', 'In Review': '#f59e0b',
  'Contacted': '#10b981', 'Closed': '#6b7280',
}[s] || '#6b7280');

export default function EnquiryDetail({ editMode = false }) {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [enquiry, setEnquiry]   = useState(null);
  const [form, setForm]         = useState({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API}/enquiries/${id}`);
        setEnquiry(res.data.data);
        setForm(res.data.data);
      } catch {
        setError('Enquiry not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.put(`${API}/enquiries/${id}`, form);
      setEnquiry(res.data.data);
      setSuccess('Enquiry updated successfully.');
      setTimeout(() => navigate('/admin/enquiries'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API}/enquiries/${id}`);
      navigate('/admin/enquiries');
    } catch {
      setError('Delete failed. Please try again.');
      setDeleting(false);
      setShowDelete(false);
    }
  };

  if (loading) return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content"><div className="admin-loading">Loading enquiry…</div></div>
    </div>
  );

  if (error && !enquiry) return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <p style={{ color: '#f87171' }}>{error}</p>
        <Link to="/admin/enquiries" className="btn-outline" style={{ marginTop: 16, display: 'inline-flex' }}>← Back</Link>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/admin/dashboard">Dashboard</Link>
          <span>›</span>
          <Link to="/admin/enquiries">Enquiries</Link>
          <span>›</span>
          <span>{enquiry?.fullName}</span>
        </div>

        <div className="detail-header">
          <div>
            <h2>{editMode ? 'Edit Enquiry' : 'Enquiry Details'}</h2>
            <p className="detail-meta">
              Submitted {new Date(enquiry?.createdAt).toLocaleString()}
              {enquiry?.updatedAt !== enquiry?.createdAt &&
                ` · Updated ${new Date(enquiry?.updatedAt).toLocaleString()}`}
            </p>
          </div>
          <div className="detail-actions-top">
            {!editMode ? (
              <>
                <Link to={`/admin/enquiries/${id}/edit`} className="action-btn edit" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                  Edit
                </Link>
                <button className="action-btn delete" style={{ padding: '8px 16px', fontSize: '0.875rem' }} onClick={() => setShowDelete(true)}>
                  Delete
                </button>
              </>
            ) : (
              <Link to={`/admin/enquiries/${id}`} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                Cancel
              </Link>
            )}
          </div>
        </div>

        {success && <div className="alert-success">{success}</div>}
        {error   && <div className="alert-error">{error}</div>}

        {editMode ? (
          /* ── Edit Form ── */
          <form className="detail-form" onSubmit={handleSave}>
            <div className="detail-card">
              <h3>Contact Information</h3>
              <div className="form-grid">
                <div className="aform-group">
                  <label>Full Name</label>
                  <input name="fullName" value={form.fullName || ''} onChange={handleChange} required />
                </div>
                <div className="aform-group">
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email || ''} onChange={handleChange} required />
                </div>
                <div className="aform-group">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone || ''} onChange={handleChange} required />
                </div>
                <div className="aform-group">
                  <label>Company Name</label>
                  <input name="companyName" value={form.companyName || ''} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Enquiry Details</h3>
              <div className="form-grid">
                <div className="aform-group">
                  <label>Service Interested In</label>
                  <select name="service" value={form.service || ''} onChange={handleChange}>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="aform-group">
                  <label>Status</label>
                  <select name="status" value={form.status || 'New'} onChange={handleChange}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="aform-group full-width">
                  <label>Message</label>
                  <textarea name="message" rows={5} value={form.message || ''} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          /* ── View Mode ── */
          <div className="detail-grid">
            <div className="detail-card">
              <h3>Contact Information</h3>
              <dl className="detail-dl">
                <div><dt>Full Name</dt><dd>{enquiry?.fullName}</dd></div>
                <div><dt>Email</dt><dd><a href={`mailto:${enquiry?.email}`}>{enquiry?.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${enquiry?.phone}`}>{enquiry?.phone}</a></dd></div>
                <div><dt>Company</dt><dd>{enquiry?.companyName}</dd></div>
              </dl>
            </div>

            <div className="detail-card">
              <h3>Enquiry Info</h3>
              <dl className="detail-dl">
                <div>
                  <dt>Service</dt>
                  <dd><span className="tag">{enquiry?.service}</span></dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className="status-badge"
                      style={{ background: statusColor(enquiry?.status) + '22', color: statusColor(enquiry?.status) }}>
                      {enquiry?.status}
                    </span>
                  </dd>
                </div>
                <div><dt>Submitted</dt><dd>{new Date(enquiry?.createdAt).toLocaleString()}</dd></div>
              </dl>
            </div>

            <div className="detail-card full-width">
              <h3>Message</h3>
              <p className="message-body">{enquiry?.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {showDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Enquiry?</h3>
            <p>This will permanently delete the enquiry from <strong>{enquiry?.fullName}</strong>. This cannot be undone.</p>
            <div className="modal-btns">
              <button className="btn-outline" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="btn-delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
