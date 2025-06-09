import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/Logo/thaiiot.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 " style={{
   backgroundColor: "#cde4ff"
  }}>
      <div className="bg-white rounded-4 shadow-lg p-5 w-100" style={{ maxWidth: "420px", position: "relative" }}>
        
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="LOGOO" >
            <img
              src="logo"
              srcSet={logo}
              alt="Logo"
              className="img-fluid"
              style={{ width: "80px", height: "80px" }} />
          </div>
          <h2 className="fw-semibold text-dark">เข้าสู่ระบบ</h2>
          <p className="text-secondary">ยินดีต้อนรับกลับมา</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control rounded-3 ${focusedField === "email" ? "border-primary" : ""}`}
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
            />
          </div>

          <div className="mb-2" >
            <input
              type="password"
              className={`form-control rounded-3 ${focusedField === "password" ? "border-primary" : ""}`}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
            />
          </div> 
          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="mb-2" style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe" >
                </input>
                <label className="form-check-label ms-2" htmlFor="rememberMe"> จดจำฉัน</label>
            </div>

          <a href="/forgotpassword" className="text-primary fw-semibold text-decoration-none">
            ลืมรหัสผ่าน ?  
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-3 shadow-sm fw-semibold">
            เข้าสู่ระบบ
          </button>
        </form>

       

        {/* Footer */}
        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-secondary mb-0">
            ยังไม่มีบัญชี?{" "}
            <a href="/register" className="text-primary fw-semibold text-decoration-none">
              สมัครสมาชิก
            </a>
          </p>
        </div>

        
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
            borderRadius: "50%",
            opacity: "0.1",
            zIndex: "-1",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)",
            borderRadius: "50%",
            opacity: "0.08",
            zIndex: "-1",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
