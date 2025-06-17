import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/images/Logo/thaiiot.png';
import './Navbar.css';

const CustomNavbar = () => {
    const navItems = [
        { to: "/", label: "หน้าแรก" },
        { to: "/news", label: "ข่าวสาร" },
        { to: "/events", label: "กิจกรรม" },
        { to: "/about", label: "เกี่ยวกับเรา" },
        { to: "/committee", label: "คณะกรรมการ" },
        { to: "/contact", label: "ติดต่อเรา" },
    ];

    return (
        <>
            <Navbar 
                collapseOnSelect 
                expand="lg" 
                variant="light" 
                fixed="top"
                className="navbar-custom"
            >
                <Container style={{ maxWidth: "1200px" }}>
                    <Navbar.Brand as={NavLink} to="/">
                        <img
                            src={logo}
                            alt="Thai IoT Logo"
                            style={{ height: "80px", width: "auto" }}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto align-items-center gap-3"> 
                            {navItems.map((item, index) => (
                                <Nav.Link 
                                    as={NavLink} 
                                    to={item.to} 
                                    key={index} 
                                    className="nav-link-custom"
                                    end={item.to === "/"} 
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                            <Nav.Link as={NavLink} to="/register" className="btn-register">
                                สมัครสมาชิก
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login" className="btn-login">
                                เข้าสู่ระบบ
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ height: "85px" }}></div> 
        </>
    );
};

export default CustomNavbar;