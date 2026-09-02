import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import './AdminDashboard.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, enquiriesRes] = await Promise.all([
          axios.get(`${API}/enquiries/stats`),
          axios.get(`${API}/enquiries?limit=5&page=1`),
        ]);
        setStats(statsRes.data.data);
        setRecent(enquiriesRes.data.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusColor = s => ({
    'New': '#3b82f6', 'In Review': '#f59e0b',
    'Contacted': '#10b981', 'Closed': '#6b7280',
  }[s] || '#6b7280');

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <div className="admin-header">
          <h2>Dashboard</h2>
          <Link to="/admin/enquiries" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
            View All Enquiries
          </Link>
        </div>

        {loading ? (
          <div className="admin-loading">Loading stats…</div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="dash-stats">
              <div className="dash-stat-card">
                <span className="dash-stat-num">{stats?.total || 0}</span>
                <span className="dash-stat-label">Total Enquiries</span>
              </div>
              {stats?.byStatus?.map(s => (
                <div className="dash-stat-card" key={s._id}>
                  <span className="dash-stat-num" style={{ color: statusColor(s._id) }}>
                    {s.count}
                  </span>
                  <span className="dash-stat-label">{s._id}</span>
                </div>
              ))}
            </div>

            {/* Top services */}
            {stats?.byService?.length > 0 && (
              <div className="dash-section">
                <h3>Top Services Requested</h3>
                <div className="service-bars">
                  {stats.byService.map(s => (
                    <div className="service-bar-row" key={s._id}>
                      <span className="service-bar-label">{s._id}</span>
                      <div className="service-bar-track">
                        <div
                          className="service-bar-fill"
                          style={{ width: `${(s.count / (stats?.total || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="service-bar-count">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent enquiries */}
            <div className="dash-section">
              <h3>Recent Enquiries</h3>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Company</th><th>Service</th><th>Status</th><th>Date</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.length === 0 ? (
                      <tr><td colSpan={6} className="empty-cell">No enquiries yet.</td></tr>
                    ) : recent.map(e => (
                      <tr key={e._id}>
                        <td>{e.fullName}</td>
                        <td>{e.companyName}</td>
                        <td><span className="tag" style={{ fontSize: '0.75rem' }}>{e.service}</span></td>
                        <td>
                          <span className="status-badge" style={{ background: statusColor(e.status) + '22', color: statusColor(e.status) }}>
                            {e.status}
                          </span>
                        </td>
                        <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Link to={`/admin/enquiries/${e._id}`} className="view-link">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
