import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import user from '../../../assets/images/Logo/thaiiot.png';
import { 
    BsFillBellFill, 
    BsFillEnvelopeFill, 
    BsSearch, 
    BsChevronDown, 
    BsPersonFill, 
    BsBoxArrowRight, 
    BsList,
    BsCalendarEvent,
    BsPersonPlusFill
} from 'react-icons/bs';

// Mock Data (ในระบบจริงจะถูกแทนที่ด้วย API)

import { membersData } from '../../../data/mock-members';
import { newsData } from '../../../data/mock-news';

// Data สำหรับค้นหาหน้าต่างๆ
const searchablePages = [
    { name: 'Dashboard', path: '/admin/dashboard', keywords: ['dashboard', 'ภาพรวม'] },
    { name: 'จัดการหน้าแรก', path: '/admin/manage-homepage', keywords: ['homepage', 'หน้าแรก'] },
    { name: 'จัดการเนื้อหาสมาคม', path: '/admin/manage-about', keywords: ['about', 'vision', 'mission', 'เกี่ยวกับ'] },
    { name: 'จัดการคณะกรรมการ', path: '/admin/manage-committee', keywords: ['committee', 'กรรมการ'] },
    { name: 'จัดการข้อมูลติดต่อ', path: '/admin/manage-contact', keywords: ['contact', 'ติดต่อ'] },
    { name: 'จัดการข่าว/กิจกรรม', path: '/admin/manage-news', keywords: ['news', 'event', 'ข่าว', 'กิจกรรม'] },
    { name: 'จัดการสมาชิก', path: '/admin/manage-members', keywords: ['member', 'user', 'สมาชิก'] },
    { name: 'จัดการข้อความติดต่อ', path: '/admin/manage-inbox', keywords: ['inbox', 'message', 'จดหมาย'] },
    { name: 'จัดการ Admin', path: '/admin/manage-admins', keywords: ['admin', 'ผู้ดูแลระบบ'] },
    { name: 'ติดตามการใช้งาน', path: '/admin/usage-tracking', keywords: ['log', 'usage', 'ติดตาม'] },
    { name: 'การสำรองข้อมูล', path: '/admin/data-backup', keywords: ['backup', 'สำรองข้อมูล'] },
];




// Component สำหรับแสดงผลลัพธ์
const SearchResultsDropdown = ({ results, query, onClose, triggerRef }) => {
    const dropdownRef = useRef(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setStyle({
                position: 'fixed',
                top: `${rect.bottom + 5}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 24px -4px rgba(50, 50, 93, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f2f5',
                zIndex: 1020,
                maxHeight: '400px',
                overflowY: 'auto',
                animation: 'fadeIn 0.2s ease-out'
            });
        }
    }, [triggerRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, triggerRef]);

    return ReactDOM.createPortal(
        <div ref={dropdownRef} style={style}>
            <div className="search-results-list">
                {results.pages.length === 0 && results.data.length === 0 ? (
                    <div className="search-result-item">ไม่พบผลการค้นหา</div>
                ) : (
                    <>
                        {results.pages.length > 0 && <div className="search-result-header">Pages</div>}
                        {results.pages.map(page => (
                            <Link key={page.path} to={page.path} className="search-result-item" onClick={onClose}>
                                {page.name}
                            </Link>
                        ))}
                        
                        {results.data.length > 0 && <div className="search-result-header">Data</div>}
                        {results.data.map(item => (
                            <Link key={item.id} to={item.path} className="search-result-item" onClick={onClose}>
                                <div>{item.title}</div>
                                <small className="text-muted">{item.type}</small>
                            </Link>
                        ))}
                         <Link to={`/admin/search?q=${query}`} className="search-result-footer" onClick={onClose}>
                            ดูผลการค้นหาทั้งหมดสำหรับ "{query}"
                        </Link>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
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
                right: `${window.innerWidth - rect.right}px`,
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

    const dropdownItemStyle = { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', color: '#525f7f', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, };
    const dropdownIconStyle = { fontSize: '1rem', color: '#8898aa' };

    return ReactDOM.createPortal(
        <div ref={dropdownRef} style={style}>
            <Link to="/admin/profile" style={dropdownItemStyle} className="dropdown-item-hover" onClick={onClose}>
                <BsPersonFill style={dropdownIconStyle} /><span>ประวัติส่วนตัว</span>
            </Link>
            <Link to="/logout" style={dropdownItemStyle} className="dropdown-item-hover" onClick={onClose}>
                <BsBoxArrowRight style={dropdownIconStyle} /><span>ออกจากระบบ</span>
            </Link>
        </div>,
        document.body
    );
};

const NotificationsDropdown = ({ onClose, triggerRef }) => {
    const dropdownRef = useRef(null);
    const [style, setStyle] = useState({});
    const notifications = [ { id: 1, icon: <BsPersonPlusFill className="text-success" />, text: "มีสมาชิกใหม่รอการอนุมัติ 2 คน", time: "10 นาทีที่แล้ว" }, { id: 2, icon: <BsCalendarEvent className="text-primary" />, text: "กิจกรรม 'IoT Expo' จะเริ่มในอีก 3 วัน", time: "1 ชั่วโมงที่แล้ว" }, { id: 3, icon: <BsFillEnvelopeFill className="text-info" />, text: "คุณมีข้อความใหม่ 1 ข้อความ", time: "เมื่อวาน" }, ];

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setStyle({
                position: 'fixed',
                top: `${rect.bottom + 10}px`,
                right: `${window.innerWidth - rect.right - 100}px`,
                width: '350px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 8px 24px -4px rgba(50, 50, 93, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f2f5',
                zIndex: 1020,
                animation: 'fadeIn 0.2s ease-out'
            });
        }
    }, [triggerRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, triggerRef]);

    return ReactDOM.createPortal(
        <div ref={dropdownRef} style={style}>
            <div className="notification-header"><h6>การแจ้งเตือน</h6></div>
            <div className="notification-list">
                {notifications.map(noti => (
                    <div key={noti.id} className="notification-item dropdown-item-hover">
                        <div className="notification-icon">{noti.icon}</div>
                        <div className="notification-content">
                            <p className="notification-text">{noti.text}</p>
                            <p className="notification-time">{noti.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="notification-footer"><Link to="/admin/notifications">ดูการแจ้งเตือนทั้งหมด</Link></div>
        </div>,
        document.body
    );
};


const AdminHeader = ({ toggleSidebar }) => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ pages: [], data: [] });
    
    const profileRef = useRef(null);
    const bellRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults({ pages: [], data: [] });
            setSearchOpen(false);
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();
        
        const foundPages = searchablePages.filter(page => 
            page.name.toLowerCase().includes(lowerQuery) || 
            page.keywords.some(k => k.includes(lowerQuery))
        );

        const foundData = [];
        membersData.forEach(m => {
            if (foundData.length < 3 && (m.firstName.toLowerCase().includes(lowerQuery) || m.lastName.toLowerCase().includes(lowerQuery))) {
                foundData.push({ id: `member-${m.id}`, title: `${m.firstName} ${m.lastName}`, type: 'Member', path: `/admin/manage-members/${m.id}` });
            }
        });
        newsData.forEach(n => {
            if (foundData.length < 3 && n.title.toLowerCase().includes(lowerQuery)) {
                foundData.push({ id: `news-${n.id}`, title: n.title, type: 'News', path: `/admin/manage-news/edit/${n.id}` });
            }
        });

        setSearchResults({ pages: foundPages, data: foundData });
        setSearchOpen(true);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/admin/search?q=${searchQuery.trim()}`);
            setSearchQuery('');
            setSearchOpen(false);
        }
    };
    
    const headerStyle = { backgroundColor: '#ffffff', padding: '1.8rem 2rem', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1010 };
    const headerRightStyle = { display: 'flex', alignItems: 'center', gap: '1.5rem' };
    const iconButtonStyle = { fontSize: '1.1rem', color: '#67748e', cursor: 'pointer', background: 'none', border: 'none', padding: 0 };
    const profileDropdownStyle = { position: 'relative' };
    const headerProfileStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.75rem' };
    const profileAvatarStyle = { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' };
    const searchBarStyle = { display: 'flex', alignItems: 'center', backgroundColor: '#f6f9fc', border: '1px solid #e9ecef', borderRadius: '8px', padding: '0.5rem 0.75rem', };
    const searchIconStyle = { color: '#8898aa', marginRight: '0.5rem' };
    const searchInputStyle = { border: 'none', background: 'transparent', outline: 'none', color: '#525f7f' };

    return (
        <>
            <style>{`
                .dropdown-item-hover:hover { background-color: #f6f9fc; }
                .dropdown-item-hover:hover span { color: #5e72e4; }
                .search-input::placeholder { color: #adb5bd; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .notification-header, .notification-footer { padding: 1rem; text-align: center; }
                .notification-header { border-bottom: 1px solid #f0f2f5; }
                .notification-header h6 { margin: 0; font-weight: 600; }
                .notification-footer { border-top: 1px solid #f0f2f5; }
                .notification-footer a { text-decoration: none; font-weight: 500; }
                .notification-list { max-height: 400px; overflow-y: auto; }
                .notification-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; cursor: pointer; }
                .notification-icon { font-size: 1.2rem; }
                .notification-content p { margin: 0; }
                .notification-text { font-size: 0.9rem; color: #344767; }
                .notification-time { font-size: 0.75rem; color: #8898aa; }
                .hamburger-btn { display: none; font-size: 1.5rem; color: #344767; background: none; border: none; cursor: pointer; margin-right: 1rem; }
                .search-results-list { padding: 0.5rem 0; }
                .search-result-header { padding: 0.5rem 1rem; font-size: 0.8rem; font-weight: 600; color: #8898aa; text-transform: uppercase; }
                .search-result-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; color: #525f7f; text-decoration: none; }
                .search-result-item:hover { background-color: #f6f9fc; }
                .search-result-footer { display: block; text-align: center; padding: 0.75rem 1rem; color: #5e72e4; font-weight: 500; text-decoration: none; border-top: 1px solid #f0f2f5; }
                @media (max-width: 992px) {
                    .hamburger-btn { display: block; }
                    .header-left .search-input { display: none; }
                    .header-profile .profile-name { display: none; }
                    .main-header { padding: 1rem 1.5rem !important; }
                }
                @media (max-width: 576px) {
                    .header-right .icon-button-group { display: none; }
                }
            `}</style>
            <header style={headerStyle} className="main-header">
                <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="hamburger-btn" onClick={toggleSidebar}><BsList /></button>
                    <form onSubmit={handleSearchSubmit}>
                        <div style={searchBarStyle} ref={searchRef}>
                            <BsSearch style={searchIconStyle} />
                            <input 
                                type="text" 
                                placeholder="ค้นหาหน้าหรือข้อมูล..." 
                                style={searchInputStyle} 
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery && setSearchOpen(true)}
                            />
                        </div>
                    </form>
                </div>
                <div style={headerRightStyle} className="header-right">
                    <div className="icon-button-group" style={{ display: 'flex', gap: '1.5rem' }}>
                        <button style={iconButtonStyle} onClick={() => navigate('/admin/manage-inbox')} title="ข้อความติดต่อ"><BsFillEnvelopeFill /></button>
                        <button style={iconButtonStyle} ref={bellRef} onClick={() => setNotificationsOpen(!isNotificationsOpen)} title="การแจ้งเตือน"><BsFillBellFill /></button>
                    </div>
                    <div style={profileDropdownStyle}>
                        <div ref={profileRef} style={headerProfileStyle} className="header-profile" onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}>
                            <img src={user} alt="User" style={profileAvatarStyle} />
                            <span className="profile-name">ชื่อผู้ใช้ (Admin)</span>
                            <BsChevronDown style={{ transition: 'transform 0.3s ease', transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </div>
                    </div>
                </div>
            </header>
            
            {isProfileDropdownOpen && <DropdownMenu onClose={() => setProfileDropdownOpen(false)} triggerRef={profileRef} />}
            {isNotificationsOpen && <NotificationsDropdown onClose={() => setNotificationsOpen(false)} triggerRef={bellRef} />}
            {isSearchOpen && searchResults && (searchResults.pages.length > 0 || searchResults.data.length > 0) && (
                <SearchResultsDropdown results={searchResults} query={searchQuery} onClose={() => setSearchOpen(false)} triggerRef={searchRef} />
            )}
        </>
    );
};

export default AdminHeader;