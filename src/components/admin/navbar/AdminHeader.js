import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import user from '../../../assets/images/Logo/thaiiot.png';
import { BsFillBellFill, BsFillEnvelopeFill, BsSearch, BsChevronDown, BsPersonFill, BsBoxArrowRight } from 'react-icons/bs';

const headerStyle = {
    backgroundColor: '#ffffff',
    padding: '1.8rem 2rem',
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1010
};

const headerRightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
};

const iconButtonStyle = {
    fontSize: '1.1rem',
    color: '#67748e',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0
};

const profileDropdownStyle = {
    position: 'relative'
};

const headerProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '0.75rem'
};

const profileAvatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover'
};

const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f6f9fc',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
};

const searchIconStyle = {
    color: '#8898aa',
    marginRight: '0.5rem'
};

const searchInputStyle = {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    color: '#525f7f'
};


const DropdownMenu = ({ onClose, triggerRef }) => {
    const dropdownRef = useRef(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setStyle({
                position: 'fixed',
                top: `${rect.bottom + 10}px`,
                left: `${rect.right - 200}px`,
                width: '200px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 24px -4px rgba(50, 50, 93, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f2f5',
                zIndex: 1020,
                padding: '0.5rem 0',
                animation: 'fadeIn 0.2s ease-out'
            });
        }
    }, [triggerRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, triggerRef]);

    const dropdownItemStyle = {
        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem',
        color: '#525f7f', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
    };

    const dropdownIconStyle = { fontSize: '1rem', color: '#8898aa' };

    return ReactDOM.createPortal(
        <div ref={dropdownRef} style={style}>
            <Link to="/admin/profile" style={dropdownItemStyle} className="dropdown-item-hover">
                <BsPersonFill style={dropdownIconStyle} /><span>ประวัติส่วนตัว</span>
            </Link>
            <Link to="/logout" style={dropdownItemStyle} className="dropdown-item-hover">
                <BsBoxArrowRight style={dropdownIconStyle} /><span>ออกจากระบบ</span>
            </Link>
        </div>,
        document.body
    );
};


const AdminHeader = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);

    return (
        <>
            <style>
                {`
                .dropdown-item-hover:hover { background-color: #f6f9fc; }
                .dropdown-item-hover:hover span { color: #5e72e4; }
                .dropdown-item-hover:hover svg { fill: #5e72e4; }
                .search-input::placeholder { color: #adb5bd; } /* สไตล์สำหรับ placeholder */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            <header style={headerStyle}>
                <div className="header-left">
                    <div style={searchBarStyle}>
                        <BsSearch style={searchIconStyle} />
                        <input type="text" placeholder="ค้นหา..." style={searchInputStyle} className="search-input" />
                    </div>
                </div>

                <div style={headerRightStyle}>
                    <button style={iconButtonStyle}><BsFillEnvelopeFill /></button>
                    <button style={iconButtonStyle}><BsFillBellFill /></button>
                    <div style={profileDropdownStyle}>
                        <div ref={profileRef} style={headerProfileStyle} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                            <img src={user} alt="User" style={profileAvatarStyle} />
                            <span className="profile-name">ชื่อผู้ใช้ (Admin)</span>
                            <BsChevronDown style={{ transition: 'transform 0.3s ease', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </div>
                    </div>
                </div>
            </header>
            
            {isDropdownOpen && <DropdownMenu onClose={() => setDropdownOpen(false)} triggerRef={profileRef} />}
        </>
    );
};

export default AdminHeader;