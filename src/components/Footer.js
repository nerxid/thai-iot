import React, { useState } from "react";
import logo from "../assets/images/Logo/thaiiot.png";

const Footer = () => {
  const [hovered, setHovered] = useState(null);

  const linkStyle = (key) => ({
    color: hovered === key ? "#0d6efd" : "#6c757d",
    textDecoration: "none",
    fontSize: "14px",
    padding: "4px 0",
    display: "block",
    transition: "color 0.2s",
  });

  const iconStyle = (key) => ({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: hovered === key ? "#0d6efd" : "#e9f0fb",
    color: hovered === key ? "#ffffff" : "#0d6efd",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginRight: "10px",
    transition: "all 0.3s ease",
  });

  return (
    <footer style={{ backgroundColor: "#f8fbff", borderTop: "1px solid #dee2e6", padding: "60px 0 30px 0" }}>
      <div className="container">
        <div className="row mb-5">
          {/* Logo */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <div style={{
              }}>
                 <img
                              src="logo"
                              srcSet={logo}
                              alt="Logo"
                              className="img-fluid"
                              style={{ width: "80px", height: "80px" }} />
                
              </div>
              <h5 className="ms-3 mb-0 text-dark">Thai IoT Association</h5>
            </div>
            <p style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6" }}>
              ศูนย์รวมองค์ความรู้ นวัตกรรม และเครือข่ายทางธุรกิจด้าน Internet of Things แห่งประเทศไทย
            </p>
            
          </div>

          
          <div className="col-md-2 mb-4">
            <h6 className="text-dark mb-3">เกี่ยวกับสมาคม</h6>
            <a href="#" style={linkStyle("about")} onMouseEnter={() => setHovered("about")} onMouseLeave={() => setHovered(null)}>เกี่ยวกับเรา</a>
            <a href="#" style={linkStyle("team")} onMouseEnter={() => setHovered("team")} onMouseLeave={() => setHovered(null)}>คณะกรรมการ</a>
            <a href="#" style={linkStyle("contact")} onMouseEnter={() => setHovered("contact")} onMouseLeave={() => setHovered(null)}>ติดต่อ</a>
            <a href="#" style={linkStyle("news")} onMouseEnter={() => setHovered("news")} onMouseLeave={() => setHovered(null)}>ข่าวสาร</a>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-dark mb-3">โครงการและบริการ</h6>
            <a href="#" style={linkStyle("event")} onMouseEnter={() => setHovered("event")} onMouseLeave={() => setHovered(null)}>กิจกรรม & อีเวนต์</a>
            <a href="#" style={linkStyle("support")} onMouseEnter={() => setHovered("support")} onMouseLeave={() => setHovered(null)}>ช่วยเหลือ</a>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-dark mb-3">ติดตามเรา</h6>
            <p style={{ color: "#6c757d", fontSize: "14px" }}>
              รับข้อมูลข่าวสารล่าสุดจาก Thai IoT Association
            </p>
            <input type="email" className="form-control mb-2" placeholder="อีเมลของคุณ" />
            <button className="btn btn-primary w-100">สมัครรับข่าวสาร</button>
          </div>
        </div>

        <div className="d-flex justify-content-between border-top pt-3 flex-wrap text-secondary" style={{ fontSize: "13px" }}>
          <p className="mb-2 mb-md-0">© 2025 Thai IoT Association | All rights reserved.</p>
          <div>
            <a href="#" className="me-3 text-decoration-none text-secondary" onMouseEnter={(e) => e.target.style.color = "#0d6efd"} onMouseLeave={(e) => e.target.style.color = "#6c757d"}>ความเป็นส่วนตัว</a>
            <a href="#" className="me-3 text-decoration-none text-secondary" onMouseEnter={(e) => e.target.style.color = "#0d6efd"} onMouseLeave={(e) => e.target.style.color = "#6c757d"}>ข้อกำหนด</a>
            <a href="#" className="text-decoration-none text-secondary" onMouseEnter={(e) => e.target.style.color = "#0d6efd"} onMouseLeave={(e) => e.target.style.color = "#6c757d"}>คุกกี้</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
