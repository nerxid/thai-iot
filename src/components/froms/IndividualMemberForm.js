import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PaymentModal from './PaymentModal';
import './MembershipForm.css';
import usePasswordValidation from './usePasswordValidation';

const IndividualMemberForm = () => {
    const navigate = useNavigate();
    const { validate: validatePassword } = usePasswordValidation();

    const [formData, setFormData] = useState({
        prefix: '',
        firstName: '',
        lastName: '',
        companyName: '',
        position: '',
        address: '',
        phone: '',
        email: '',
        lineId: '',
        password: '',
        confirmPassword: '',
        paymentType: 'initial', 
        membershipDuration: 'yearly',
        acceptNews: false,
    });

    const [customPrefix, setCustomPrefix] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (formErrors[name] || formErrors.general) {
            setFormErrors(prev => ({ ...prev, [name]: null, general: null }));
        }

        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        const requiredFields = ['prefix', 'firstName', 'lastName', 'address', 'phone', 'email', 'lineId'];
        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = 'กรุณากรอกข้อมูล';
        });

        if (formData.prefix === 'อื่นๆ' && !customPrefix.trim()) newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';
        
        if (!formData.email) {
            newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }

        if (!formData.phone) {
            newErrors.phone = 'กรุณากรอกหมายเลขโทรศัพท์';
        } else if (formData.phone.length !== 10) {
            newErrors.phone = 'หมายเลขโทรศัพท์ต้องมี 10 หลัก';
        }
        
        const passwordValidation = validatePassword(formData.password, formData.confirmPassword);
        if (!passwordValidation.isValid) {
            Object.assign(newErrors, passwordValidation.errors);
        }

        if (!formData.paymentType) newErrors.paymentType = 'กรุณาเลือกประเภทการชำระเงิน';
        
        if (Object.keys(newErrors).length > 0) {
            newErrors.general = 'กรุณาตรวจสอบและแก้ไขข้อมูลในช่องที่มีเครื่องหมายสีแดงให้ถูกต้อง';
            setFormErrors(newErrors);
            return;
        }

        setFormErrors({});
        const dataToSend = { ...formData, prefix: formData.prefix === 'อื่นๆ' ? customPrefix : formData.prefix };
        delete dataToSend.confirmPassword;
        console.log('Submitting Individual Member Data:', dataToSend);
        setShowConfirmationModal(true);
    };

    const handleModalClose = () => {
        setShowConfirmationModal(false);
        alert('ระบบได้ส่งข้อมูลของท่านเรียบร้อยแล้ว');
        navigate('/');
    };

    return (
        <>
            <div className="card p-4 p-md-5 border-0 shadow-lg membership-form-card">
                <div className="card-body">
                    <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกบุคคลธรรมดา</h2>
                    <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                    <form noValidate onSubmit={handleSubmit}>
                        {formErrors.general && <Alert variant="danger">{formErrors.general}</Alert>}
                        <div className="row g-4">
                            <div className="col-md-4"><label htmlFor="prefix-ind" className="form-label">คำนำหน้า*</label><select id="prefix-ind" name="prefix" className={`form-select ${formErrors.prefix ? 'is-invalid' : ''}`} value={formData.prefix} onChange={handleChange} required><option value="">เลือก...</option><option value="นาย">นาย</option><option value="นาง">นาง</option><option value="นางสาว">นางสาว</option><option value="อื่นๆ">อื่นๆ...</option></select><div className="invalid-feedback">{formErrors.prefix}</div></div>
                            {formData.prefix === 'อื่นๆ' && ( <div className="col-md-4"><label htmlFor="custom-prefix-ind" className="form-label">ระบุคำนำหน้า*</label><input type="text" id="custom-prefix-ind" name="customPrefix" className={`form-control ${formErrors.customPrefix ? 'is-invalid' : ''}`} value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required /><div className="invalid-feedback">{formErrors.customPrefix}</div></div> )}
                            <div className="col-md-4"><label htmlFor="firstName-ind" className="form-label">ชื่อ*</label><input type="text" id="firstName-ind" name="firstName" className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.firstName}</div></div>
                            <div className="col-md-4"><label htmlFor="lastName-ind" className="form-label">นามสกุล*</label><input type="text" id="lastName-ind" name="lastName" className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lastName}</div></div>
                            <div className="col-md-6"><label htmlFor="companyName-ind" className="form-label">ชื่อบริษัท</label><input type="text" id="companyName-ind" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /></div>
                            <div className="col-md-6"><label htmlFor="position-ind" className="form-label">ตำแหน่ง</label><input type="text" id="position-ind" name="position" className="form-control" value={formData.position} onChange={handleChange} /></div>
                            <div className="col-12"><label htmlFor="address-ind" className="form-label">ที่อยู่*</label><textarea id="address-ind" name="address" rows="3" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} required></textarea><div className="invalid-feedback">{formErrors.address}</div></div>
                            <div className="col-md-6"><label htmlFor="phone-ind" className="form-label">หมายเลขโทรศัพท์*</label><input type="tel" id="phone-ind" name="phone" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} maxLength="10" required /><div className="invalid-feedback">{formErrors.phone}</div></div>
                            <div className="col-md-6"><label htmlFor="email-ind" className="form-label">E-mail*</label><input type="email" id="email-ind" name="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.email}</div></div>
                            <div className="col-md-6"><label htmlFor="lineId-ind" className="form-label">Line-ID*</label><input type="text" id="lineId-ind" name="lineId" className={`form-control ${formErrors.lineId ? 'is-invalid' : ''}`} value={formData.lineId} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lineId}</div></div>
                            <div className="col-md-6"><label htmlFor="password-ind" className="form-label">รหัสผ่าน*</label><input type="password" id="password-ind" name="password" className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleChange} required />{formErrors.password ? <div className="invalid-feedback">{formErrors.password}</div> : <small className="form-text text-muted">อย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข</small>}</div>
                            <div className="col-md-6"><label htmlFor="confirmPassword-ind" className="form-label">ยืนยันรหัสผ่าน*</label><input type="password" id="confirmPassword-ind" name="confirmPassword" className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.confirmPassword}</div></div>
                            
                            <div className="col-12 mt-5">
                                <h5 className="fw-bold mb-3">ประเภทการชำระเงิน*</h5>
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="initial-ind" value="initial" checked={formData.paymentType === 'initial'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="initial-ind">
                                                <strong>แรกเข้า</strong><br />
                                                <small className="text-muted">(มีค่าแรกเข้า 1,000 บาท)</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="renewal-ind" value="renewal" checked={formData.paymentType === 'renewal'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="renewal-ind">
                                                <strong>ต่ออายุ</strong><br />
                                                <small className="text-muted">(ไม่มีค่าบริการ)</small>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {formErrors.paymentType && <div className="text-danger mt-2 small">{formErrors.paymentType}</div>}
                            </div>
                            
                            <div className="col-12 mt-4"> 
                                <h5 className="fw-bold mb-3">เลือกระยะเวลาการสมัครสมาชิก*</h5> 
                                <div className="row gy-3"> 
                                    <div className="col-md-6"> 
                                        <div className="membership-duration-option"> 
                                            <input className="form-check-input" type="radio" name="membershipDuration" id="yearly-ind" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange} /> 
                                            <label className="form-check-label h-100" htmlFor="yearly-ind"> 
                                                <strong>สมาชิกรายปี</strong><br />2,140 บาท (รวม vat 7%) 
                                            </label> 
                                        </div> 
                                    </div> 
                                    <div className="col-md-6"> 
                                        <div className="membership-duration-option"> 
                                            <input className="form-check-input" type="radio" name="membershipDuration" id="lifetime-ind" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange} /> 
                                            <label className="form-check-label h-100" htmlFor="lifetime-ind"> 
                                                <strong>สมาชิกตลอดชีพ</strong><br />11,770 บาท (รวม vat 7%) 
                                            </label> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div>
                            
                            <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews-ind" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews-ind"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                            <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"><button type="submit" className="btn btn-primary btn-lg px-5">ยืนยันการสมัคร</button><Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link></div>
                        </div>
                    </form>
                </div>
            </div>
            <PaymentModal show={showConfirmationModal} onHide={handleModalClose} />
        </>
    );
};

export default IndividualMemberForm;