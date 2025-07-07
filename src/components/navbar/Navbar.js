import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Bell, BellFill, BoxArrowRight, PersonBadge, Calendar2Check, Speedometer2 } from 'react-bootstrap-icons'; 
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Logo/thaiiot.png';
import './Navbar.css';

const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth]);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { width: size[0] };
};

const CustomNavbar = () => {
    const { isLoggedIn, user, login, logout } = useAuth();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isMobile = width < 992;

    const [notifications, setNotifications] = useState([
        { id: 1, text: 'มีข่าวใหม่จากสมาคม!', link: '/news/1', read: false },
        { id: 2, text: 'กิจกรรม I² Starter Kit ใกล้เต็มแล้ว', link: '/events/2', read: false },
        { id: 3, text: 'ยินดีต้อนรับ! ขอบคุณที่สมัครเป็นสมาชิก', link: '/profile', read: true },
        { id: 4, text: 'สมาชิกของคุณจะหมดอายุในอีก 30 วัน', link: '/profile', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogin = () => {
        login({ name: 'user test' });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNotificationClick = (clickedId) => {
        setNotifications(
            notifications.map(n => n.id === clickedId ? { ...n, read: true } : n)
        );
    };

    const navItems = [
        { to: "/", label: "หน้าแรก" },
        { to: "/news", label: "ข่าวสาร" },
        { to: "/events", label: "กิจกรรม" },
        { to: "/about", label: "เกี่ยวกับเรา" },
        { to: "/committee", label: "คณะกรรมการ" },
        { to: "/contact", label: "ติดต่อเรา" },
    ];

    const renderNotificationDropdown = (isMobileView = false) => (
        <NavDropdown
            title={
                isMobileView ? (
                    <>
                        <BellFill size={24} />
                        {unreadCount > 0 && <Badge pill bg="danger" className="notification-dot mobile">{unreadCount}</Badge>}
                    </>
                ) : (
                    <div className="notification-bell">
                        {unreadCount > 0 ? <BellFill size={20} /> : <Bell size={20} />}
                        {unreadCount > 0 && <Badge pill bg="danger" className="notification-dot">{unreadCount}</Badge>}
                    </div>
                )
            }
            id={isMobileView ? "notification-menu-mobile" : "notification-menu"}
            align="end"
            className="notification-dropdown"
        >
            <div className="notification-header">การแจ้งเตือน</div>
            {notifications.map(n => (
                <NavDropdown.Item 
                    key={n.id} 
                    as={NavLink} 
                    to={n.link} 
                    onClick={() => handleNotificationClick(n.id)}
                    className={`notification-item ${!n.read ? 'unread' : 'read'}`}
                >
                    {n.text}
                </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/notifications" className="notification-footer">
                ดูการแจ้งเตือนทั้งหมด
            </NavDropdown.Item>
        </NavDropdown>
    );

    const renderLoggedInUserMenu = () => {
        if (isMobile) {
            return (
                <>
                     <hr className="mobile-menu-divider" />
                    {user?.role === 'admin' && (
                        <Nav.Link as={NavLink} to="/admin/dashboard" className="mobile-user-link admin-link-mobile">
                            <Speedometer2 className="me-2" /> เมนูผู้ดูแลระบบ
                        </Nav.Link>
                    )}
                    <Nav.Link as={NavLink} to="/profile" className="mobile-user-link"><PersonBadge className="me-2" /> โปรไฟล์</Nav.Link>
                    <Nav.Link as={NavLink} to="/my-events" className="mobile-user-link"><Calendar2Check className="me-2" /> กิจกรรมของฉัน</Nav.Link>
                    <hr className="mobile-menu-divider" />
                    <Nav.Link onClick={handleLogout} className="mobile-user-link text-danger"><BoxArrowRight className="me-2" /> ออกจากระบบ</Nav.Link>
                </>
            );
        }

        return (
             <NavDropdown
                title={
                    <>
                        
                        <span>{user.name}</span>
                    </>
                }
                id="user-menu"
                className="user-menu-dropdown"
                align="end"
            >
                 
                <NavDropdown.Item as={NavLink} to="/profile" end>โปรไฟล์</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/my-events" end>กิจกรรมของฉัน</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
        );
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="light" fixed="top" className="navbar-custom">
                <Container style={{ maxWidth: "1200px" }}>
                    <Navbar.Brand as={NavLink} to="/">
                        <img src={logo} alt="Thai IoT Logo" style={{ height: "80px", width: "auto" }} />
                    </Navbar.Brand>

                    <div className="d-flex align-items-center d-lg-none ms-auto">
                        {isLoggedIn && renderNotificationDropdown(true)}
                    </div>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className={isLoggedIn ? 'ms-2' : ''} />
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-lg-3">
                            {navItems.map((item) => (
                                <Nav.Link as={NavLink} to={item.to} key={item.to} className="nav-link-custom" end>
                                    {item.label}
                                </Nav.Link>
                            ))}

                            {isLoggedIn ? (
                                <div className="d-none d-lg-flex align-items-center">

                                    {renderNotificationDropdown(false)}
                                    {user?.role === 'admin' && ( 
                                        <Nav.Link as={NavLink} to="/admin/dashboard" className="btn-admin-panel">
                                            <Speedometer2 className="me-2" />
                                            เมนูผู้ดูแลระบบ
                                        </Nav.Link>
                                    )}
                                    
                                    {renderLoggedInUserMenu()}
                                </div>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/register" className="btn-register">สมัครสมาชิก</Nav.Link>
                                    <Nav.Link onClick={handleLogin} className="btn-login">เข้าสู่ระบบ</Nav.Link>
                                </>
                            )}
                             {isLoggedIn && isMobile && renderLoggedInUserMenu()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ height: "100px" }}></div>
        </>
    );
};

export default CustomNavbar;