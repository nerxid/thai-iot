import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import logo from "../../../assets/images/Logo/thaiiot.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card bg-white rounded-4 shadow-lg w-100 mx-3 mx-md-0 p-4 p-md-5">
        
        <div className="decorative-circle decorative-circle-1"></div>
        <div className="decorative-circle decorative-circle-2"></div>
        
        <div className="text-center mb-4">
          <img
            src={logo} 
            alt="Logo"
            className="img-fluid mb-3"
            style={{ width: "80px", height: "80px" }}
          />
          <h2 className="fw-semibold text-dark">เข้าสู่ระบบ</h2>
          <p className="text-secondary">ยินดีต้อนรับกลับมา</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-3 py-2" 
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-3 py-2"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                จดจำฉัน
              </label>
            </div>
            <a href="/forgotpassword" className="text-primary fw-semibold text-decoration-none small">
              ลืมรหัสผ่าน?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-3 shadow-sm fw-semibold py-2">
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-secondary mb-0">
            ยังไม่มีบัญชี?{" "}
            <a href="/register" className="text-primary fw-semibold text-decoration-none">
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;