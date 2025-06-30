import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css'; 
import logo from "../../../assets/images/Logo/thaiiot.png";


const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="logo-info">
            <h4>ThaiIOT</h4>
            <span>Association</span>
          </div>
        </div>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" className="sidebar-link">
            <span className="icon">🏠</span> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="sidebar-link">
            <span className="icon">👥</span> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className="sidebar-link">
            <span className="icon">📦</span> Products
          </NavLink>
        </li>
         <li>
          <NavLink to="/admin/orders" className="sidebar-link">
            <span className="icon">🛒</span> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className="sidebar-link">
            <span className="icon">⚙️</span> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;