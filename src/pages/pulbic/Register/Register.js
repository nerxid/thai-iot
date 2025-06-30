import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import RegistrationForm from "./RegistrationForm";

const membershipTypes = [
    { key: "student", title: "สมาชิกวิสามัญ", subtitle: "นักเรียน นิสิต นักศึกษา ครู อาจารย์", price: "ฟรี", lifetimePrice: "", benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "✘ ได้สิทธิ์ประชาสัมพันธ์กิจการ สินค้า และบริการ", "✘ ลงมติต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"], featured: false, },
    { key: "general", title: "สมาชิกผู้สนใจทั่วไป", subtitle: "", price: "ฟรี", benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "✘ ได้สิทธิ์ประชาสัมพันธ์กิจการ สินค้า และบริการ", "✘ ลงมติต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"], featured: false, },
    { key: "corporate", title: "สมาชิกสามัญ นิติบุคคล", subtitle: "(สำหรับผู้ประกอบการ IoT)", price: "6,420 บาท", unit: "ต่อปี", lifetimePrice: "54,570 บาท ตลอดชีพ", benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "ได้สิทธิ์ประชาสัมพันธ์กิจการ สินค้า และบริการ", "ลงมติต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา สูงสุด 3 ท่าน"], featured: false, },
    { key: "individual", title: "สมาชิกสามัญ บุคคลธรรมดา", subtitle: "", price: "2,140 บาท", unit: "ต่อปี", lifetimePrice: "11,770 บาท ตลอดชีพ", benefits: ["ได้รับข้อมูลข่าวสารเกี่ยวกับ IoT", "✘ ได้สิทธิ์ประชาสัมพันธ์กิจการ สินค้า และบริการ", "ลงมติต่างๆในสมาคม", "เข้าร่วมประชุมสัมมนา 1 ท่าน"], featured: true, },
];

const Register = () => {
    const { memberType } = useParams();
    const location = useLocation();
    const { user } = useAuth();

    const isChangePlanFlow = location.state?.flow === 'changePlan';
    const basePath = isChangePlanFlow ? '/change-plan' : '/register';

    if (memberType && !isChangePlanFlow) {
        return <RegistrationForm memberType={memberType} />;
    }

    return (
        <div className="register-page-container">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-dark mb-3">
                        {isChangePlanFlow ? 'เลือกแผนสมาชิกที่ต้องการเปลี่ยน' : 'สมัครสมาชิก'}
                    </h1>
                    <p className="lead text-secondary">เลือกแพ็กเกจสมาชิกที่เหมาะสมกับคุณ</p>
                </div>

                <div className="row g-4 justify-content-center">
                    {membershipTypes.map((type) => {
                        const isCurrentPlan = isChangePlanFlow && user?.currentPlan === type.key;
                        return (
                            <div className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" key={type.key}>
                                <div className={`card h-100 membership-card ${type.featured ? 'featured' : ''} ${isCurrentPlan ? 'current-plan' : ''}`}>
                                    {type.featured && !isCurrentPlan && <div className="featured-badge">แนะนำ</div>}
                                    
                                    <div className="card-body p-4 d-flex flex-column">
                                        {isCurrentPlan && <div className="current-plan-badge mb-3">แผนปัจจุบันของคุณ</div>}
                                        
                                        <div className="text-center mb-4">
                                            <h5 className="fw-bold mb-1 card-title">{type.title}</h5>
                                            {type.subtitle && <p className="small mb-0 card-subtitle">{type.subtitle}</p>}
                                        </div>
                                        <div className="text-center mb-4 price-section">
                                            <div className="price-display">
                                                <span className="h3 fw-bold">{type.price}</span>
                                                {type.unit && <span className="text-muted ms-1">/ {type.unit}</span>}
                                            </div>
                                            {type.lifetimePrice && <div className="small lifetime-price">{type.lifetimePrice}</div>}
                                        </div>
                                        
                                        <Link 
                                            to={`${basePath}/${type.key}`} 
                                            state={isChangePlanFlow ? { flow: 'changePlan' } : {}} 
                                            className={`btn fw-semibold mt-auto btn-select-plan ${type.featured ? 'btn-primary' : 'btn-outline-primary'}`}
                                            style={isCurrentPlan ? { pointerEvents: 'none' } : {}}
                                        >
                                            {isCurrentPlan ? 'แผนปัจจุบัน' : (isChangePlanFlow ? 'เลือกแผนนี้' : 'สมัครสมาชิก')}
                                        </Link>
                                        
                                        <hr className="my-3" />

                                        <h6 className="fw-bold mb-3 benefit-header">สิทธิ์ที่จะได้รับ</h6>
                                        <ul className="list-unstyled flex-grow-1 mb-0 benefit-list">
                                            {type.benefits.map((benefit, i) => (
                                                <li key={i} className="mb-2 d-flex align-items-start">
                                                    {benefit.startsWith("✘") ? (
                                                        <>
                                                            <span className="me-2 benefit-icon benefit-icon-cross">✕</span>
                                                            <span className="benefit-text strikethrough">{benefit.substring(2)}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="me-2 benefit-icon benefit-icon-check">✓</span>
                                                            <span className="benefit-text">{benefit}</span>
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Register;