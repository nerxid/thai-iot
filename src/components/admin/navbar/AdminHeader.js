import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css';
import user from '../../../assets/images/Logo/thaiiot.png';

import { BsFillBellFill, BsFillEnvelopeFill, BsSearch, BsChevronDown } from 'react-icons/bs';

const AdminHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="admin-header">
      <div className="header-left">
        { <div className="search-bar">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="ค้นหา..." />
        </div> }
      </div>

      <div className="header-right">
        <button className="icon-button">
          <BsFillEnvelopeFill />
        </button>
        <button className="icon-button">
          <BsFillBellFill />
        </button>

        <div className="profile-dropdown">
          <div className="header-profile" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <img src={user} alt="User" className="profile-avatar" />
            <span className="profile-name">ชื่อผู้ใช้ (Admin)</span>
            <BsChevronDown className={`arrow ${isDropdownOpen ? 'open' : ''}`} />
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