import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/Logo/thaiiot.png";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          zIndex: 1000,
        }}
      >
        <div
          className="container-fluid"
          style={{ maxWidth: "1200px", padding: "0 1.5rem" }}
        >
          <img
            src={logo}
            alt="Thai IoT Logo"
            style={{
              height: "80px",
              width: "auto",
              transition: "all 0.3s ease",
            }}
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "none", background: "transparent" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center" style={{ gap: "0.5rem" }}>
              {[
                { to: "/", label: "หน้าแรก" },
                { to: "/news", label: "ข่าวสาร" },
                { to: "/events", label: "กิจกรรม" },
                { to: "/about", label: "เกี่ยวกับเรา" },
                { to: "/contact", label: "ติดต่อเรา" },
                { to: "/contact", label: "คณะกรรมการ" },
              ].map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className="nav-link"
                    to={item.to}
                    style={{
                      color: "#1e3a8a",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      transition: "all 0.3s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#e0f2fe";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={{
                    background: "#60a5fa",
                    color: "#ffffff",
                    fontWeight: 600,
                    padding: "0.5rem 1.25rem",
                    borderRadius: "8px",
                    marginLeft: "0.5rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#60a5fa";
                  }}
                >
                  สมัครสมาชิก
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={{
                    background: "#1e3a8a",
                    color: "#ffffff",
                    fontWeight: 600,
                    padding: "0.5rem 1.25rem",
                    borderRadius: "8px",
                    marginLeft: "0.5rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1e3a8a";
                  }}
                >
                  เข้าสู่ระบบ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      <div style={{ height: "70px" }}></div>
    </>
  );
};

export default Navbar;
