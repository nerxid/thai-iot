import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; 
import RegistrationForm from "./RegistrationForm";

const membershipTypes = [
    {
        key: "student",
        title: "สมาชิกวิสามัญ",
        subtitle: "นักเรียน นิสิต นักศึกษา ครู อาจารย์",
        price: "ฟรี",
        lifetimePrice: "",
        benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ", "ลงมติได้ต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"],
        featured: false,
    },
    {
        key: "general",
        title: "สมาชิกผู้สนใจทั่วไป",
        subtitle: "",
        price: "ฟรี",
        benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ", "✘ ลงมติได้ต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"],
        featured: false,
    },
    {
        key: "corporate",
        title: "สมาชิกสามัญ นิติบุคคล",
        subtitle: "(สำหรับผู้ประกอบการ IoT)",
        price: "6,420 บาท ต่อ ปี",
        lifetimePrice: "54,570 บาท ตลอดชีพ",
        benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ", "ลงมติได้ต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา สูงสุด 3 ท่าน"],
        featured: true,
    },
    {
        key: "individual",
        title: "สมาชิกสามัญ บุคคลธรรมดา",
        subtitle: "",
        price: "2,140 บาท ต่อ ปี",
        lifetimePrice: "11,770 บาท ตลอดชีพ",
        benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "✘ ได้สิทธิเข้าร่วมประชาสัมพันธ์กิจการ สินค้า และบริการ", "ลงมติได้ต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"],
        featured: false,
    },
];

const Register = () => {
    const { memberType } = useParams();

    if (memberType) {
        return <RegistrationForm memberType={memberType} />;
    }

    return (
        <div className="register-page-container">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-dark mb-3">สมัครสมาชิก</h1>
                    <p className="lead text-secondary">เลือกแพ็กเกจสมาชิกที่เหมาะสมกับคุณ</p>
                </div>

                <div className="row g-4 justify-content-center">
                    {membershipTypes.map((type) => (
                        <div className="col-12 col-md-6 col-lg-3" key={type.key}>
                            <div className={`card h-100 membership-card ${type.featured ? 'featured' : ''}`}>
                                {type.featured && <div className="featured-badge">แนะนำ</div>}
                                
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="text-center mb-4">
                                        <h5 className="fw-bold mb-1 card-title" style={{ fontSize: "1.1rem", lineHeight: "1.3" }}>
                                            {type.title}
                                        </h5>
                                        {type.subtitle && <p className="small mb-0 card-subtitle">{type.subtitle}</p>}
                                    </div>

                                    <div className="text-center mb-4">
                                        <div className="h3 fw-bold mb-1 price-display">{type.price}</div>
                                        {type.lifetimePrice && <div className="small lifetime-price">{type.lifetimePrice}</div>}
                                    </div>

                                    <Link to={`/register/${type.key}`} className="btn fw-semibold mb-4 btn-select-plan">
                                        สมัครสมาชิก
                                    </Link>
                                    
                                    <hr className={`my-3 ${type.featured ? 'border-white opacity-25' : ''}`} />

                                    <h6 className="fw-bold mb-3 benefit-header">สิทธิ์ที่จะได้รับ</h6>
                                    <ul className="list-unstyled flex-grow-1 mb-0">
                                        {type.benefits.map((benefit, i) => (
                                            <li key={i} className="mb-2 d-flex align-items-start">
                                                {benefit.startsWith("✘") ? (
                                                    <>
                                                        <span className="me-2 mt-1 benefit-icon-cross">✕</span>
                                                        <span className="benefit-text strikethrough">{benefit.substring(2)}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="me-2 mt-1 benefit-icon-check">✓</span>
                                                        <span className="benefit-text">{benefit}</span>
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