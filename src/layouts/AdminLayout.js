import React from 'react';
import AdminSidebar from '../components/admin/navbar/AdminSidebar';
import AdminHeader from '../components/admin/navbar/AdminHeader';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <main className="admin-page-content">
          {children} 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;