import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 


import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// --- Public Pages ---
import Home from './pages/pulbic/home/Home';
import Login from './pages/pulbic/Login/Login';
import Register from './pages/pulbic/Register/Register';
import Forgot from './pages/pulbic/Login/ForgotPassword';
import NewsListPage from './pages/pulbic/News/NewsListPage';
import NewsDetailPage from './pages/pulbic/News/NewsDetailPage';
import EventsPage from './pages/pulbic/Even/EventsPage';
import EventDetailPage from './pages/pulbic/Even/EventDetailPage';
import AboutUsPage from './pages/pulbic/About/AboutUsPage';
import CommitteePage from './pages/pulbic/CommitteePage/CommitteePage';
import ContactPage from './pages/pulbic/Contact/ContactPage';
import ProfilePage from './pages/pulbic/ProfilePage/ProfilePage';
import ChangePlanPage from './pages/pulbic/ProfilePage/ChangePlanPage/ChangePlanPage';
import MyEventsPage from './pages/pulbic/MyEventsPage/MyEventsPage'
import EventRegistrationPage from './pages/pulbic/EventRegistrationPage/EventRegistrationPage';
import ChangePasswordPage from './pages/pulbic/ProfilePage/ChangePasswordPage/ChangePasswordPage';
import NotificationsPage from './pages/pulbic/NotificationsPage/NotificationsPage';


// --- Admin Pages ---
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard';
import ManageHomePage from './pages/admin/ManageHomePage/ManageHomePage';
import ManageNewsPage from './pages/admin/ManageNews/ManageNewsPage';
import NewsFormPage from './pages/admin/ManageNews/NewsFormPage';
import ManageEventsPage from './pages/admin/ManageEvents/ManageEventsPage';
import EventFormPage from './pages/admin/ManageEvents/EventFormPage';
import EventRegistrationFormBuilder from './pages/admin/ManageEvents/EventRegistrationFormBuilder';
import EventRegistrantsPage from './pages/admin/ManageEvents/EventRegistrantsPage';
import EventSubmissionDetailPage from './pages/admin/ManageEvents/EventSubmissionDetailPage';
import ManageCommitteePage from './pages/admin/ManageCommittee/ManageCommitteePage';
import ManageMembersPage from './pages/admin/ManageMembers/ManageMembersPage';
import MemberDetailPage from './pages/admin/ManageMembers/MemberDetailPage';
import ManageAboutPage from './pages/admin/ManageAbout/ManageAboutPage';
import ManageContactPage from './pages/admin/ManageContact/ManageContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> 
        <Routes>

          {/* Public Routes with PublicLayout */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/register/:memberType" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/ForgotPassword" element={<PublicLayout><Forgot /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><NewsListPage /></PublicLayout>} />
          <Route path="/news/:newsId" element={<PublicLayout><NewsDetailPage /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
          <Route path="/events/:eventId" element={<PublicLayout><ProtectedRoute><EventDetailPage /></ProtectedRoute></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutUsPage /></PublicLayout>} />
          <Route path="/committee" element={<PublicLayout><CommitteePage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/events/:eventId/register" element={<PublicLayout><ProtectedRoute><EventRegistrationPage /></ProtectedRoute></PublicLayout>} />
          <Route path="/profile" element={<PublicLayout><ProtectedRoute><ProfilePage /></ProtectedRoute></PublicLayout>} />
          <Route path="/my-events" element={<PublicLayout><ProtectedRoute><MyEventsPage /></ProtectedRoute></PublicLayout>} />
          <Route path="/change-password" element={<PublicLayout><ProtectedRoute><ChangePasswordPage /></ProtectedRoute></PublicLayout>} />
          <Route path="/change-plan/:memberType" element={<PublicLayout><ProtectedRoute><ChangePlanPage /></ProtectedRoute></PublicLayout>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />


          {/* Admin Routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/manage-home" element={<AdminLayout><ManageHomePage /></AdminLayout>} />
          <Route path="/admin/manage-news" element={<AdminLayout><ManageNewsPage /></AdminLayout>} />
          <Route path="/admin/manage-news/add" element={<AdminLayout><NewsFormPage /></AdminLayout>} />
          <Route path="/admin/manage-news/edit/:newsId" element={<AdminLayout><NewsFormPage /></AdminLayout>} />
          <Route path="/admin/manage-events" element={<AdminLayout><ManageEventsPage /></AdminLayout>} />
          <Route path="/admin/manage-events/add" element={<AdminLayout><EventFormPage /></AdminLayout>} />
          <Route path="/admin/manage-events/edit/:eventId" element={<AdminLayout><EventFormPage /></AdminLayout>} />
          <Route path="/admin/manage-events/add/step2" element={<AdminLayout><EventRegistrationFormBuilder /></AdminLayout>} />
          <Route path="/admin/manage-events/:eventId/registrants" element={<AdminLayout><EventRegistrantsPage /></AdminLayout>} />
          <Route path="/admin/manage-events/:eventId/registrants/:registrantId" element={<AdminLayout><EventSubmissionDetailPage /></AdminLayout>} />
          <Route path="/admin/manage-committee" element={<AdminLayout><ManageCommitteePage /></AdminLayout>} />
          <Route path="/admin/manage-members" element={<AdminLayout><ManageMembersPage /></AdminLayout>} />
          <Route path="/admin/manage-members/:memberId" element={<AdminLayout><MemberDetailPage /></AdminLayout>} />
          <Route path="/admin/manage-about" element={<AdminLayout><ManageAboutPage /></AdminLayout>} /> 
          <Route path="/admin/manage-contact" element={<AdminLayout><ManageContactPage /></AdminLayout>} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;