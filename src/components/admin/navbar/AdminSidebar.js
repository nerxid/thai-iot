
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './AdminSidebar.css'; 
import logo from "../../../assets/images/Logo/thaiiot.png";

import { 
    BsGrid1X2Fill, 
    BsFolderFill, 
    BsChevronDown,
    BsFillPeopleFill,
    BsMegaphoneFill,
    BsEnvelopeFill,
    BsFillGearFill,
    BsHouseDoorFill,
    BsInfoCircleFill,
    BsPeopleFill,
    BsHeadset,
    BsNewspaper,
    BsPersonBadgeFill,
    BsInboxFill
} from "react-icons/bs";

const AdminSidebar = () => {
    const [isContentMenuOpen, setContentMenuOpen] = useState(true);
    const location = useLocation();

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
                        <span className="icon"><BsGrid1X2Fill /></span> Dashboard
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <div className="sidebar-link-dropdown" onClick={() => setContentMenuOpen(!isContentMenuOpen)}>
                        <div className="menu-title">
                            <span className="icon"><BsFolderFill /></span>
                            <span>การจัดการ</span>
                        </div>
                        <span className={`arrow ${isContentMenuOpen ? 'open' : ''}`}><BsChevronDown /></span>
                    </div>

                    {isContentMenuOpen && (
                        <ul className="submenu">
                            <li><NavLink to="/admin/manage-home" className="sidebar-link"><span className="icon"><BsHouseDoorFill /></span>หน้าแรก</NavLink></li>
                            <li><NavLink to="/admin/manage-about" className="sidebar-link"><span className="icon"><BsInfoCircleFill /></span>เนื้อหาสมาคม</NavLink></li>
                            <li><NavLink to="/admin/manage-committee" className="sidebar-link"><span className="icon"><BsPeopleFill /></span>คณะกรรมการ</NavLink></li>
                            <li><NavLink to="/admin/manage-contact" className="sidebar-link"><span className="icon"><BsHeadset /></span>ข้อมูลติดต่อ</NavLink></li>
                            
                            <li>
                                <NavLink 
                                    to="/admin/manage-news" 
                                    className={({ isActive }) => 
                                        isActive || location.pathname.startsWith('/admin/manage-events') 
                                        ? "sidebar-link active" 
                                        : "sidebar-link"
                                    }
                                >
                                    <span className="icon"><BsNewspaper /></span>ข่าว/กิจกรรม
                                </NavLink>
                            </li>

                            <li><NavLink to="/admin/manage-members" className="sidebar-link"><span className="icon"><BsPersonBadgeFill /></span>สมาชิก</NavLink></li>
                            <li><NavLink to="/admin/manage-inbox" className="sidebar-link"><span className="icon"><BsInboxFill /></span>จดหมาย</NavLink></li>
                        </ul>
                    )}
                </li>

                 <li className="menu-header">
                    จัดการแอดมิน
                </li>
                 <li>
                    <NavLink to="/admin/manage-admins" className="sidebar-link">
                        <span className="icon"><BsFillPeopleFill /></span> จัดการผู้ดูแลระบบ
                    </NavLink>
                </li>
                 <li>
                    <NavLink to="/admin/system-settings" className="sidebar-link">
                        <span className="icon"><BsFillGearFill /></span> จัดการการใช้งานระบบ
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;