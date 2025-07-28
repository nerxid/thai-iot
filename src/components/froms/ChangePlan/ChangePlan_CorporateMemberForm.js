import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './MembershipForm.css';

const ChangePlanCorporateMemberForm = () => {
    const navigate = useNavigate();

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
        paymentType: 'initial', // เพิ่ม state ใหม่
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
            setFormData(prev => ({ ...prev, companyCertificate: files[0] || null }));
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

        const requiredFields = ['prefix', 'firstName', 'lastName', 'companyName', 'position', 'address', 'phone', 'email', 'lineId', 'companyCertificate', 'paymentType'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'กรุณากรอกข้อมูล';
            }
        });
        if (formData.prefix === 'อื่นๆ' && !customPrefix.trim()) newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';

        if (formData.phone && formData.phone.length !== 10) newErrors.phone = 'หมายเลขโทรศัพท์ต้องมี 10 หลัก';
        if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';

        if (formData.companyCertificate) {
            const file = formData.companyCertificate;
            const MAX_SIZE_MB = 5;
            if (file.type !== 'application/pdf') newErrors.companyCertificate = 'กรุณาอัปโหลดไฟล์นามสกุล .pdf เท่านั้น';
            else if (file.size > MAX_SIZE_MB * 1024 * 1024) newErrors.companyCertificate = `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const dataToSend = { ...formData, prefix: formData.prefix === 'อื่นๆ' ? customPrefix : formData.prefix };
            console.log('Submitting Corporate Plan Change Data:', dataToSend);
            setShowConfirmationModal(true);
        }
    };

    const handleModalClose = () => {
        setShowConfirmationModal(false);
        alert('ระบบได้ส่งคำขอเปลี่ยนแผนของท่านเรียบร้อยแล้ว');
        navigate('/profile');
    };

    return (
        <>
            <div className="card p-4 p-md-5 border-0 shadow-lg membership-form-card">
                <div className="card-body">
                    <h2 className="card-title text-center fw-bold mb-2">แบบฟอร์มขอเปลี่ยนแผนสมาชิก (นิติบุคคล)</h2>
                    <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {/* ... Form fields for personal info ... */}
                            <div className="col-md-4"><label htmlFor="prefix-corp-change" className="form-label">คำนำหน้า*</label><select id="prefix-corp-change" name="prefix" className={`form-select ${formErrors.prefix ? 'is-invalid' : ''}`} value={formData.prefix} onChange={handleChange} required><option value="">เลือก...</option><option value="นาย">นาย</option><option value="นาง">นาง</option><option value="นางสาว">นางสาว</option><option value="อื่นๆ">อื่นๆ...</option></select><div className="invalid-feedback">{formErrors.prefix}</div></div>
                            {formData.prefix === 'อื่นๆ' && (<div className="col-md-4"><label htmlFor="custom-prefix-corp-change" className="form-label">ระบุคำนำหน้า*</label><input type="text" id="custom-prefix-corp-change" className={`form-control ${formErrors.customPrefix ? 'is-invalid' : ''}`} value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required /><div className="invalid-feedback">{formErrors.customPrefix}</div></div>)}
                            <div className="col-md-4"><label htmlFor="firstName-corp-change" className="form-label">ชื่อ*</label><input type="text" id="firstName-corp-change" name="firstName" className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.firstName}</div></div>
                            <div className="col-md-4"><label htmlFor="lastName-corp-change" className="form-label">นามสกุล*</label><input type="text" id="lastName-corp-change" name="lastName" className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lastName}</div></div>
                            <div className="col-md-6"><label htmlFor="companyName-corp-change" className="form-label">ชื่อบริษัท*</label><input type="text" id="companyName-corp-change" name="companyName" className={`form-control ${formErrors.companyName ? 'is-invalid' : ''}`} value={formData.companyName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.companyName}</div></div>
                            <div className="col-md-6"><label htmlFor="position-corp-change" className="form-label">ตำแหน่ง*</label><input type="text" id="position-corp-change" name="position" className={`form-control ${formErrors.position ? 'is-invalid' : ''}`} value={formData.position} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.position}</div></div>
                            <div className="col-12"><label htmlFor="address-corp-change" className="form-label">ที่อยู่*</label><textarea id="address-corp-change" name="address" rows="3" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} required></textarea><div className="invalid-feedback">{formErrors.address}</div></div>
                            <div className="col-md-6"><label htmlFor="phone-corp-change" className="form-label">หมายเลขโทรศัพท์*</label><input type="tel" id="phone-corp-change" name="phone" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} maxLength="10" required /><div className="invalid-feedback">{formErrors.phone}</div></div>
                            <div className="col-md-6"><label htmlFor="email-corp-change" className="form-label">E-mail*</label><input type="email" id="email-corp-change" name="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.email}</div></div>
                            <div className="col-md-6"><label htmlFor="lineId-corp-change" className="form-label">Line-ID*</label><input type="text" id="lineId-corp-change" name="lineId" className={`form-control ${formErrors.lineId ? 'is-invalid' : ''}`} value={formData.lineId} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lineId}</div></div>
                           
                            <div className="col-12 mt-5">
                                <h5 className="fw-bold mb-3">ประเภทการชำระเงิน*</h5>
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="initial-corp-change" value="initial" checked={formData.paymentType === 'initial'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="initial-corp-change">
                                                <strong>แรกเข้า</strong><br />
                                                <small className="text-muted">(มีค่าแรกเข้า 1,000 บาท)</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="membership-duration-option">
                                            <input className="form-check-input" type="radio" name="paymentType" id="renewal-corp-change" value="renewal" checked={formData.paymentType === 'renewal'} onChange={handleChange} />
                                            <label className="form-check-label h-100" htmlFor="renewal-corp">
                                                <strong>ต่ออายุ</strong><br />
                                                <small className="text-muted">(ไม่มีค่าบริการ)</small>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {formErrors.paymentType && <div className="text-danger mt-2 small">{formErrors.paymentType}</div>}
                            </div>
                            
                            <div className="col-12 mt-4"><h5 className="fw-bold mb-3">เลือกระยะเวลาการสมัครสมาชิก*</h5><div className="row gy-3"><div className="col-md-6"><div className="membership-duration-option"><input className="form-check-input" type="radio" name="membershipDuration" id="yearly-corp-change" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange} /><label className="form-check-label h-100" htmlFor="yearly-corp-change"><strong>สมาชิกรายปี</strong><br />6,420 บาท (รวม vat 7%)</label></div></div><div className="col-md-6"><div className="membership-duration-option"><input className="form-check-input" type="radio" name="membershipDuration" id="lifetime-corp-change" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange} /><label className="form-check-label h-100" htmlFor="lifetime-corp-change"><strong>สมาชิกตลอดชีพ</strong><br />54,570 บาท (รวม vat 7%)</label></div></div></div></div>
                            <div className="col-12 mt-4">
                                <label htmlFor="companyCertificate-change" className="form-label">อัปโหลดใบหนังสือรับรอง* <small className="text-muted ms-2">(เฉพาะไฟล์ .pdf ขนาดไม่เกิน 5MB)</small></label>
                                <input className={`form-control ${formErrors.companyCertificate ? 'is-invalid' : ''}`} type="file" id="companyCertificate-change" name="companyCertificate" onChange={handleChange} required accept="application/pdf" />
                                <div className="invalid-feedback">{formErrors.companyCertificate}</div>
                            </div>
                            <div className="col-12 mt-4"><div className="form-check"><input className="form-check-input" type="checkbox" id="acceptNews-corp-change" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /><label className="form-check-label" htmlFor="acceptNews-corp-change">ยินยอมรับข่าวสารและกิจกรรม</label></div></div>
                            <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"><button type="submit" className="btn btn-primary btn-lg px-5">ยืนยัน</button><Link to="/profile" className="btn btn-outline-secondary btn-lg px-5">ยกเลิก</Link></div>
                        </div>
                    </form>
                </div>
            </div>
            <PaymentModal show={showConfirmationModal} onHide={handleModalClose} />
        </>
    );
};

export default ChangePlanCorporateMemberForm;