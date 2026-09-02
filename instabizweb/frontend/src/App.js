import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import EnquiryList from './pages/admin/EnquiryList';
import EnquiryDetail from './pages/admin/EnquiryDetail';

// Only show public Navbar/Footer on non-admin pages
function PublicLayout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return isAdmin ? children : (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PublicLayout>
          <Routes>
            {/* Public pages */}
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-us"   element={<WhyUs />} />
            <Route path="/contact"  element={<Contact />} />

            {/* Admin — login (public) */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin — protected */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/enquiries" element={
              <ProtectedRoute><EnquiryList /></ProtectedRoute>
            } />
            <Route path="/admin/enquiries/:id" element={
              <ProtectedRoute><EnquiryDetail editMode={false} /></ProtectedRoute>
            } />
            <Route path="/admin/enquiries/:id/edit" element={
              <ProtectedRoute><EnquiryDetail editMode={true} /></ProtectedRoute>
            } />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
