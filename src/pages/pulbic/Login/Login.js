import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../assets/images/Logo/thaiiot.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. เรียก API เพื่อรับ CSRF Token ก่อน (ถ้ายังไม่มี)
    if (!document.cookie.includes('csrftoken')) {
      await axios.get("http://localhost:8000/api/csrf/", {
        withCredentials: true
      });
    }

    // 2. ดึง CSRF Token จากคุกกี้ (ฟังก์ชันที่แก้ไขแล้ว)
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const csrfToken = getCookie('csrftoken');

    // 3. ส่ง Request Login
    const response = await axios.post(
      "http://localhost:8000/api/accounts/login/",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );

    
    // 4. เรียกฟังก์ชัน login
    login(response.data.user, rememberMe);
    
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response?.status === 403) {
      alert("CSRF Token ไม่ถูกต้องหรือหมดอายุ");
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  }
};

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 "
      style={{ backgroundColor: "#cde4ff" }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-5 w-100"
        style={{ maxWidth: "420px", position: "relative" }}
      >
        <div className="text-center mb-4">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
          <h2 className="fw-semibold text-dark">เข้าสู่ระบบ</h2>
          <p className="text-secondary">ยินดีต้อนรับกลับมา</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control rounded-3 ${
                focusedField === "email" ? "border-primary" : ""
              }`}
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className={`form-control rounded-3 ${
                focusedField === "password" ? "border-primary" : ""
              }`}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="mb-2" style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label ms-2" htmlFor="rememberMe">
                จดจำฉัน
              </label>
            </div>
            <a
              href="/forgotpassword"
              className="text-primary fw-semibold text-decoration-none"
            >
              ลืมรหัสผ่าน ?
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 shadow-sm fw-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-secondary mb-0">
            ยังไม่มีบัญชี?{" "}
            <a
              href="/register"
              className="text-primary fw-semibold text-decoration-none"
            >
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;