
import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./RegistrationForm";

const membershipTypes = [
  {
    key: "student",
    title: "สมาชิกวิสามัญ",
    subtitle: "นักเรียน นิสิต นักศึกษา ครู อาจารย์",
    price: "ฟรี",
    lifetimePrice: "",
    benefits: [
      "ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT",
      "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ",
      "ลงมติได้ต่างๆในสมาคม",
      "เข้าร่วมประชุมสัมมนา 1 ท่าน",
    ],
    featured: false,
  },
  {
    key: "general",
    title: "สมาชิกผู้สนใจทั่วไป",
    subtitle: "",
    price: "ฟรี",
    benefits: [
      "ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT",
      "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ",
      "✘ ลงมติได้ต่างๆในสมาคม",
      "เข้าร่วมประชุมสัมมนา 1 ท่าน",
    ],
    featured: false,
  },
  {
    key: "corporate",
    title: "สมาชิกสามัญ นิติบุคคล",
    subtitle: "(สำหรับผู้ประกอบการ IoT)",
    price: "6,420 บาท ต่อ ปี",
    lifetimePrice: "54,570 บาท ตลอดชีพ",
    benefits: [
      "ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT",
      "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ",
      "ลงมติได้ต่างๆในสมาคม",
      "เข้าร่วมประชุมสัมมนา สูงสุด 3 ท่าน",
    ],
    featured: true,
  },
    {
    key: "individual",
    title: "สมาชิกสามัญ บุคคลธรรมดา",
    subtitle: "",
    price: "2,140 บาท ต่อ ปี",
    lifetimePrice: "11,770 บาท ตลอดชีพ",
    benefits: [
      "ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT",
      "✘ ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ",
      "ลงมติได้ต่างๆในสมาคม",
      "เข้าร่วมประชุมสัมมนา 1 ท่าน",
    ],
    featured: false,
  },
];

const Register = () => {
  const { memberType } = useParams();

  
  if (memberType) {
    return <RegistrationForm memberType={memberType} />;
  }

  
  return (
    
    <div style={{ backgroundColor: "#cde4ff", minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-black mb-3">สมัครสมาชิก</h1>
          <p className="lead text-black opacity-75">เลือกแพ็กเกจสมาชิกที่เหมาะสมกับคุณ</p>
        </div>

        <div className="row g-4 justify-content-center">
          {membershipTypes.map((type, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              
              <div 
                className="card h-100 border-0 shadow-lg position-relative overflow-hidden"
                style={{
                  background: type.featured 
                    ? "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)" 
                    : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  transform: "translateY(0)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                }}
              >
                {type.featured && (
                  <div 
                    className="position-absolute top-0 end-0 px-3 py-1 text-white fw-bold"
                    style={{
                      background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                      borderRadius: "0 20px 0 15px",
                      fontSize: "0.8rem"
                    }}
                  >
                    แนะนำ
                  </div>
                )}
                
                <div className="card-body p-4 d-flex flex-column">
                  <div className="text-center mb-4">
                    <h5 className={`fw-bold mb-1 ${type.featured ? 'text-white' : 'text-dark'}`} style={{ fontSize: "1.1rem", lineHeight: "1.3" }}>
                      {type.title}
                    </h5>
                    {type.subtitle && (<p className={`small mb-0 ${type.featured ? 'text-white opacity-75' : 'text-muted'}`}>{type.subtitle}</p>)}
                  </div>

                  <div className="text-center mb-4">
                    <div className={`h3 fw-bold mb-1 ${type.featured ? 'text-white' : ''}`} style={{ color: type.featured ? '#fff' : '#2196F3' }}>
                      {type.price}
                    </div>
                    {type.lifetimePrice && (<div className={`small ${type.featured ? 'text-white opacity-75' : 'text-muted'}`}>{type.lifetimePrice}</div>)}
                  </div>

                  
                  <Link
                    to={`/register/${type.key}`}
                    className={`btn fw-semibold mb-4 ${type.featured ? 'btn-light text-primary' : 'btn-primary'}`}
                    style={{
                      borderRadius: "15px",
                      padding: "12px 24px",
                      border: "none",
                      textDecoration: 'none',
                      background: type.featured 
                        ? "rgba(255, 255, 255, 0.95)" 
                        : "linear-gradient(135deg, #2196F3, #21CBF3)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    สมัครสมาชิก
                  </Link>
                  

                  <hr className={`my-3 ${type.featured ? 'border-white opacity-25' : 'border-light'}`} style={{ borderWidth: "2px" }} />

                  <h6 className={`fw-bold mb-3 ${type.featured ? 'text-white' : 'text-dark'}`}>สิทธิ์ที่จะได้รับ</h6>
                  <ul className="list-unstyled flex-grow-1 mb-0">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="mb-2 d-flex align-items-start">
                        {benefit.startsWith("✘") ? (
                           <>
                            <span className="me-2 mt-1" style={{ color: "#FF5252", fontSize: "1.1rem", lineHeight: "1" }}>✕</span>
                            <span className={`${type.featured ? 'text-white opacity-75' : 'text-muted'}`} style={{ textDecoration: "line-through", fontSize: "0.9rem" }}>{benefit.substring(2)}</span>
                           </>
                        ) : (
                           <>
                            <span className="me-2 mt-1" style={{ color: type.featured ? '#fff' : "#4CAF50", fontSize: "1.1rem", lineHeight: "1" }}>✓</span>
                            <span className={`${type.featured ? 'text-white' : 'text-dark'}`} style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>{benefit}</span>
                           </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;