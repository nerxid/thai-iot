import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/images/Logo/thaiiot.png';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row row-mobile-tweaked">
                    <div className="col-md-4 footer-col footer-brand">
                        <div className="d-flex align-items-center mb-3 footer-logo-wrapper">
                            <img
                                src={logo}
                                alt="Logo"
                                className="footer-logo"
                            />
                            <h5 className="ms-3 mb-0 text-dark">Thai IoT Association</h5>
                        </div>
                        <p style={{ lineHeight: "1.6" }}>
                            ศูนย์รวมองค์ความรู้ นวัตกรรม และเครือข่ายทางธุรกิจด้าน Internet of Things แห่งประเทศไทย
                        </p>
                    </div>

                    <div className="col-md-2 footer-col footer-links">
                        <h6 className="footer-title">เกี่ยวกับสมาคม</h6> 
                        <Link to="/about" className="footer-link">เกี่ยวกับเรา</Link>
                        <Link to="/committee" className="footer-link">คณะกรรมการ</Link>
                        <Link to="/contact" className="footer-link">ติดต่อ</Link>
                        <Link to="/news" className="footer-link">ข่าวสาร</Link>
                    </div>

                    <div className="col-md-3 footer-col footer-links">
                        <h6 className="footer-title">โครงการและบริการ</h6>
                        <Link to="/events" className="footer-link">กิจกรรม & อีเวนต์</Link>
                        <Link to="#" className="footer-link">ช่วยเหลือ</Link>
                    </div>
                    
                    <div className="col-md-3 footer-col footer-newsletter">
                        <h6 className="footer-title">ติดตามเรา</h6>
                        <p>รับข้อมูลข่าวสารล่าสุดจาก Thai IoT Association</p>
                        <input type="email" className="form-control mb-2" placeholder="อีเมลของคุณ" />
                        <button className="btn btn-primary w-100">สมัครรับข่าวสาร</button>
                    </div>
                </div>

                <div className="d-flex justify-content-between flex-wrap footer-bottom-bar">
                    <p className="mb-0">© 2025 Thai IoT Association | All rights reserved.</p>
                    <div>
                        <Link to="#" className="footer-link me-3">ความเป็นส่วนตัว</Link>
                        <Link to="#" className="footer-link me-3">ข้อกำหนด</Link>
                        <Link to="#" className="footer-link">คุกกี้</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;