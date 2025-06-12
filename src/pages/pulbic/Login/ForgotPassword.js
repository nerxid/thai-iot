import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#cde4ff" }}>
      <div className="card shadow p-4" style={{ width: "400px", backgroundColor: "#ffffff", borderRadius: "12px" }}>
        <h3 className="text-center mb-4" style={{ color: "#007bff" }}>ลืมรหัสผ่าน</h3>
        <p className="text-center" style={{ color: "#6c757d" }}>
          กรุณากรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
        </p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: "#007bff" }}>อีเมล</label>
            <input type="email" className="form-control" id="email" placeholder="กรอกอีเมลของคุณ" />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#007bff", color: "#fff" }}>
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </button>
        </form>
        <p className="text-center mt-3">
          <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>กลับไปหน้าเข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
