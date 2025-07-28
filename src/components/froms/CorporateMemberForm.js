import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './MembershipForm.css';
import usePasswordValidation from './usePasswordValidation';

const CorporateMemberForm = () => {
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
        companyCertificate: null,
        acceptNews: false,
    });

    const [customPrefix, setCustomPrefix] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }

        if (name === 'companyCertificate') {
            const file = files[0];

            if (!file) {
                setFormData(prev => ({ ...prev, companyCertificate: null }));
                return;
            }

            const MAX_SIZE_MB = 5;
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
            const ALLOWED_TYPE = 'application/pdf';

            if (file.type !== ALLOWED_TYPE || file.size > MAX_SIZE_BYTES) {
                let errorMessage = '';
                if (file.type !== ALLOWED_TYPE) {
                    errorMessage = 'กรุณาอัปโหลดไฟล์นามสกุล .pdf เท่านั้น';
                } else if (file.size > MAX_SIZE_BYTES) {
                    errorMessage = `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
                }
                
                setFormErrors(prev => ({ ...prev, companyCertificate: errorMessage }));
                setFormData(prev => ({ ...prev, companyCertificate: null }));
                e.target.value = null; 
                return;
            }
            
            setFormData(prev => ({ ...prev, companyCertificate: file }));

        } else if (name === 'phone') {
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
        if (!formData.prefix) newErrors.prefix = 'กรุณาเลือกคำนำหน้า';
        if (formData.prefix === 'อื่นๆ' && !customPrefix) newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';
        if (!formData.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
        if (!formData.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';
        if (!formData.companyName) newErrors.companyName = 'กรุณากรอกชื่อบริษัท';
        if (!formData.position) newErrors.position = 'กรุณากรอกตำแหน่ง';
        if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
        if (!formData.lineId) newErrors.lineId = 'กรุณากรอก Line ID';
        
         if (!formData.email) {
            newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }
        
        if (!formData.phone) newErrors.phone = 'กรุณากรอกหมายเลขโทรศัพท์';
        else if (formData.phone.length !== 10) newErrors.phone = 'หมายเลขโทรศัพท์ต้องมี 10 หลัก';

        const passwordValidation = validatePassword(formData.password, formData.confirmPassword);
        if (!passwordValidation.isValid) {
            Object.assign(newErrors, passwordValidation.errors);
        }
        
        if (!formData.companyCertificate) {
            newErrors.companyCertificate = 'กรุณาอัปโหลดใบรับรอง';
        }

        if (!formData.paymentType) newErrors.paymentType = 'กรุณาเลือกประเภทการชำระเงิน';

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const dataToSend = { ...formData, prefix: formData.prefix === 'อื่นๆ' ? customPrefix : formData.prefix };
            delete dataToSend.confirmPassword;

            console.log('Submitting Corporate Data:', dataToSend);
            setShowConfirmationModal(true);
        }
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
                    <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกนิติบุคคล</h2>
                    <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row g-4">
                            
                            <div className="col-md-4"><label htmlFor="prefix-corp" className="form-label">คำนำหน้า*</label><select id="prefix-corp" name="prefix" className={`form-select ${formErrors.prefix ? 'is-invalid' : ''}`} value={formData.prefix} onChange={handleChange} required><option value="">เลือก...</option><option value="นาย">นาย</option><option value="นาง">นาง</option><option value="นางสาว">นางสาว</option><option value="อื่นๆ">อื่นๆ...</option></select>{formErrors.prefix && <div className="invalid-feedback">{formErrors.prefix}</div>}</div>
                            {formData.prefix === 'อื่นๆ' && ( <div className="col-md-4"><label htmlFor="custom-prefix-corp" className="form-label">ระบุคำนำหน้า*</label><input type="text" id="custom-prefix-corp" className={`form-control ${formErrors.customPrefix ? 'is-invalid' : ''}`} value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required />{formErrors.customPrefix && <div className="invalid-feedback">{formErrors.customPrefix}</div>}</div> )}
                            <div className="col-md-4"><label htmlFor="firstName-corp" className="form-label">ชื่อ*</label><input type="text" id="firstName-corp" name="firstName" className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} required />{formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}</div>
                            <div className="col-md-4"><label htmlFor="lastName-corp" className="form-label">นามสกุล*</label><input type="text" id="lastName-corp" name="lastName" className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} required />{formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}</div>
                            <div className="col-md-6"><label htmlFor="companyName-corp" className="form-label">ชื่อบริษัท*</label><input type="text" id="companyName-corp" name="companyName" className={`form-control ${formErrors.companyName ? 'is-invalid' : ''}`} value={formData.companyName} onChange={handleChange} required />{formErrors.companyName && <div className="invalid-feedback">{formErrors.companyName}</div>}</div>
                            <div className="col-md-6"><label htmlFor="position-corp" className="form-label">ตำแหน่ง*</label><input type="text" id="position-corp" name="position" className={`form-control ${formErrors.position ? 'is-invalid' : ''}`} value={formData.position} onChange={handleChange} required />{formErrors.position && <div className="invalid-feedback">{formErrors.position}</div>}</div>
                            <div className="col-12"><label htmlFor="address-corp" className="form-label">ที่อยู่*</label><textarea id="address-corp" name="address" rows="3" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} required></textarea>{formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}</div>
                            <div className="col-md-6"><label htmlFor="phone-corp" className="form-label">หมายเลขโทรศัพท์*</label><input type="tel" id="phone-corp" name="phone" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} maxLength="10" required />{formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}</div>
                            <div className="col-md-6"><label htmlFor="email-corp" className="form-label">E-mail*</label><input type="email" id="email-corp" name="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} required />{formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}</div>
                            <div className="col-md-6"><label htmlFor="lineId-corp" className="form-label">Line-ID*</label><input type="text" id="lineId-corp" name="lineId" className={`form-control ${formErrors.lineId ? 'is-invalid' : ''}`} value={formData.lineId} onChange={handleChange} required />{formErrors.lineId && <div className="invalid-feedback">{formErrors.lineId}</div>}</div>
                            <div className="col-md-6"><label htmlFor="password-corp" className="form-label">รหัสผ่าน*</label><input type="password" id="password-corp" name="password" className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleChange} required />{formErrors.password ? <div className="invalid-feedback">{formErrors.password}</div> : <small className="form-text text-muted">อย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข</small>}</div>
                            <div className="col-md-6"><label htmlFor="confirmPassword-corp" className="form-label">ยืนยันรหัสผ่าน*</label><input type="password" id="confirmPassword-corp" name="confirmPassword" className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleChange} required />{formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}</div>
                            
                            
                            <div className="col-12 mt-5">
                                <h5 className="fw-bold mb-3">ประเภทการชำระเงิน*</h5>
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="initial-corp" value="initial" checked={formData.paymentType === 'initial'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="initial-corp">
                                                <strong>แรกเข้า</strong><br />
                                                <small className="text-muted">(มีค่าแรกเข้า 1,000 บาท)</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="renewal-corp" value="renewal" checked={formData.paymentType === 'renewal'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="renewal-corp">
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
                                            <input className="form-check-input" type="radio" name="membershipDuration" id="yearly-corp" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange} /> 
                                            <label className="form-check-label h-100" htmlFor="yearly-corp"> 
                                                <strong>สมาชิกรายปี</strong><br />6,420 บาท (รวม vat 7%) 
                                            </label> 
                                        </div> 
                                    </div> 
                                    <div className="col-md-6"> 
                                        <div className="membership-duration-option"> 
                                            <input className="form-check-input" type="radio" name="membershipDuration" id="lifetime-corp" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange} /> 
                                            <label className="form-check-label h-100" htmlFor="lifetime-corp"> 
                                                <strong>สมาชิกตลอดชีพ</strong><br />54,570 บาท (รวม vat 7%) 
                                            </label> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div>
                            
                            <div className="col-12 mt-4"><label htmlFor="companyCertificate" className="form-label">อัปโหลดใบหนังสือรับรอง* <small className="text-muted ms-2">(เฉพาะไฟล์ .pdf ขนาดไม่เกิน 5MB)</small></label><input className={`form-control ${formErrors.companyCertificate ? 'is-invalid' : ''}`} type="file" id="companyCertificate" name="companyCertificate" onChange={handleChange} required accept="application/pdf" />{formErrors.companyCertificate && <div className="invalid-feedback">{formErrors.companyCertificate}</div>}</div>
                            <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews-corp" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews-corp"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                            <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
                                <button type="submit" className="btn btn-primary btn-lg px-5">ยืนยันการสมัคร</button>
                                <Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <PaymentModal show={showConfirmationModal} onHide={handleModalClose} />
        </>
    );
};

export default CorporateMemberForm;