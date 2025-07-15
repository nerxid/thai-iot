import React, { useState } from 'react';
import AdminSidebar from '../components/admin/navbar/AdminSidebar';
import AdminHeader from '../components/admin/navbar/AdminHeader';
import ScrollToTopButton from '../components/ScrollToTopButton';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="admin-main-content">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="admin-page-content">
          {children}
        </main>
        <ScrollToTopButton /> 
        
      </div>
      
    </div>
  );
};

export default AdminLayout;