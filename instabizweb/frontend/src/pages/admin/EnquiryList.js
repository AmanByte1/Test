import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import './EnquiryList.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const SERVICES = ['','Website Development','Web/Mobile App Development','CRM','ERP/Odoo','Custom Software','Business Automation','AI Automation','API Integration','Digital Marketing','Other'];
const STATUSES = ['','New','In Review','Contacted','Closed'];

const statusColor = s => ({
  'New': '#3b82f6', 'In Review': '#f59e0b',
  'Contacted': '#10b981', 'Closed': '#6b7280',
}[s] || '#6b7280');

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [status, setStatus]     = useState('');
  const [service, setService]   = useState('');
  const [page, setPage]         = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search)  params.append('search', search);
      if (status)  params.append('status', status);
      if (service) params.append('service', service);

      const res = await axios.get(`${API}/enquiries?${params}`);
      setEnquiries(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, service]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  // Debounce search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/enquiries/${id}`);
      setDeleteId(null);
      fetchEnquiries();
    } catch (err) {
      alert('Delete failed. Please try again.');
    }
  };

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <div className="admin-header">
          <h2>All Enquiries</h2>
          <span className="total-badge">{pagination.total} total</span>
        </div>

        {/* Filters */}
        <div className="eq-filters">
          <input
            type="text"
            placeholder="Search name, email, company…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="eq-search"
          />
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
            {STATUSES.map(s => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
          </select>
          <select value={service} onChange={e => { setService(e.target.value); setPage(1); }}>
            {SERVICES.map(s => <option key={s} value={s}>{s || 'All Services'}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="dash-section" style={{ marginTop: 0 }}>
          <div className="dash-table-wrap">
            {loading ? (
              <div className="admin-loading">Loading…</div>
            ) : (
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr><td colSpan={8} className="empty-cell">No enquiries match your filters.</td></tr>
                  ) : enquiries.map(e => (
                    <tr key={e._id}>
                      <td className="td-bold">{e.fullName}</td>
                      <td className="td-grey">{e.email}</td>
                      <td className="td-grey">{e.phone}</td>
                      <td>{e.companyName}</td>
                      <td><span className="tag" style={{ fontSize: '0.73rem' }}>{e.service}</span></td>
                      <td>
                        <span className="status-badge" style={{ background: statusColor(e.status) + '22', color: statusColor(e.status) }}>
                          {e.status}
                        </span>
                      </td>
                      <td className="td-grey">{new Date(e.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-btns">
                          <Link to={`/admin/enquiries/${e._id}`} className="action-btn view">View</Link>
                          <Link to={`/admin/enquiries/${e._id}/edit`} className="action-btn edit">Edit</Link>
                          <button className="action-btn delete" onClick={() => setDeleteId(e._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span>Page {page} of {pagination.pages}</span>
              <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          )}
        </div>

        {/* Delete confirm modal */}
        {deleteId && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Delete Enquiry?</h3>
              <p>This action cannot be undone.</p>
              <div className="modal-btns">
                <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn-delete" onClick={() => handleDelete(deleteId)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
