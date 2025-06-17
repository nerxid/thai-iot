
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// --- Public Pages ---
import Home from './pages/pulbic/Home';
import Login from './pages/pulbic/Login/Login';
import Register from './pages/pulbic/Register/Register';
import Forgot from './pages/pulbic/Login/ForgotPassword';
import NewsListPage from './pages/pulbic/News/NewsListPage';
import NewsDetailPage from './pages/pulbic/News/NewsDetailPage';
import EventsPage from './pages/pulbic/Even/EventsPage';
import EventDetailPage from './pages/pulbic/Even/EventDetailPage';
import AboutUsPage from './pages/pulbic/AboutUsPage';
import CommitteePage from './pages/pulbic/CommitteePage';
import ContactPage from './pages/pulbic/ContactPage';

// --- Admin Pages ---
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />     
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/register/:memberType" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/ForgotPassword" element={<PublicLayout><Forgot /></PublicLayout>} />
        <Route path="/news" element={<PublicLayout><NewsListPage /></PublicLayout>} />
        <Route path="/news/:newsId" element={<PublicLayout><NewsDetailPage /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
        <Route path="/events/:eventId" element={<PublicLayout><EventDetailPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutUsPage /></PublicLayout>} />
        <Route path="/committee" element={<PublicLayout><CommitteePage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        
        

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        

      </Routes>
    </Router>
  );
}

export default App;