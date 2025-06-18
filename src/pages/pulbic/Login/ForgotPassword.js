import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for email:", email);
    alert("หากอีเมลของคุณมีอยู่ในระบบ เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้แล้ว");
    setEmail("");
  };

  return (
    <div className="forgot-password-container d-flex justify-content-center align-items-center p-3">
      <div className="forgot-password-card card shadow-lg w-100 p-4 p-sm-5">
        
        <h3 className="card-title text-center mb-2">ลืมรหัสผ่านใช่ไหม?</h3>
        <p className="card-subtitle text-center mb-4">
          ไม่ต้องกังวล! กรอกอีเมลของคุณด้านล่าง เราจะส่งลิงก์เพื่อตั้งรหัสผ่านใหม่ไปให้
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">อีเมล</label>
            <input
              type="email"
              className="form-control py-2"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">
            <i className="fas fa-paper-plane me-2"></i>
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="back-to-login-link text-primary">
            กลับไปหน้าเข้าสู่ระบบ
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default ForgotPassword;