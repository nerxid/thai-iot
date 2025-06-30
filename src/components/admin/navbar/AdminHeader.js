
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css';
import user from '../../../assets/images/Logo/thaiiot.png';


import { BsFillBellFill, BsEnvelopeFill } from 'react-icons/bs';

const AdminHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="search-bar">
          <input type="text" placeholder="ค้นหา..." />
          <button type="submit">🔍</button>
        </div>
      </div>
      <div className="header-right">
        
        <div className="icon-button">
          <BsEnvelopeFill />
        </div>
        <div className="icon-button">
          <BsFillBellFill />
        </div>

        <div className="profile-dropdown">
          <div className="header-profile" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <img src={user} alt="User" />
            <span>ชื่อผู้ใช้ (Admin)</span>
            <span className="arrow">▼</span>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/admin/profile" className="dropdown-item">โปรไฟล์</Link>
              <Link to="/logout" className="dropdown-item">ออกจากระบบ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;