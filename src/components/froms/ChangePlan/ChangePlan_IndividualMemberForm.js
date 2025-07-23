import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './MembershipForm.css';

const ChangePlanIndividualMemberForm = () => {
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
        membershipDuration: 'yearly',
        idCardCopy: null,
        acceptNews: false,
    });
    
    const [customPrefix, setCustomPrefix] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));

        if (name === 'idCardCopy') { 
            setFormData(prev => ({ ...prev, idCardCopy: files[0] || null }));
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
        
        const requiredFields = ['prefix', 'firstName', 'lastName', 'address', 'phone', 'email', 'lineId', 'idCardCopy'];
        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = 'กรุณากรอกข้อมูล';
        });
        if (formData.prefix === 'อื่นๆ' && !customPrefix.trim()) newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';

        if (formData.phone && formData.phone.length !== 10) newErrors.phone = 'หมายเลขโทรศัพท์ต้องมี 10 หลัก';
        if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';

        if (formData.idCardCopy) {
            const file = formData.idCardCopy;
            const MAX_SIZE_MB = 5;
            if (file.type !== 'application/pdf') newErrors.idCardCopy = 'กรุณาอัปโหลดไฟล์นามสกุล .pdf เท่านั้น';
            else if (file.size > MAX_SIZE_MB * 1024 * 1024) newErrors.idCardCopy = `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const dataToSend = { ...formData, prefix: formData.prefix === 'อื่นๆ' ? customPrefix : formData.prefix };
            console.log('Submitting Individual Plan Change Data:', dataToSend);
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
                    <h2 className="card-title text-center fw-bold mb-2">แบบฟอร์มขอเปลี่ยนแผนสมาชิก (บุคคลธรรมดา)</h2>
                    <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <label htmlFor="prefix-ind-change" className="form-label">คำนำหน้า*</label>
                                <select id="prefix-ind-change" name="prefix" className={`form-select ${formErrors.prefix ? 'is-invalid' : ''}`} value={formData.prefix} onChange={handleChange} required>
                                    <option value="">เลือก...</option><option value="นาย">นาย</option><option value="นาง">นาง</option><option value="นางสาว">นางสาว</option><option value="อื่นๆ">อื่นๆ...</option>
                                </select>
                                <div className="invalid-feedback">{formErrors.prefix}</div>
                            </div>
                            {formData.prefix === 'อื่นๆ' && (
                                <div className="col-md-4">
                                    <label htmlFor="custom-prefix-ind-change" className="form-label">ระบุคำนำหน้า*</label>
                                    <input type="text" id="custom-prefix-ind-change" className={`form-control ${formErrors.customPrefix ? 'is-invalid' : ''}`} value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required />
                                    <div className="invalid-feedback">{formErrors.customPrefix}</div>
                                </div>
                            )}
                            <div className="col-md-4"><label htmlFor="firstName-ind-change" className="form-label">ชื่อ*</label><input type="text" id="firstName-ind-change" name="firstName" className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.firstName}</div></div>
                            <div className="col-md-4"><label htmlFor="lastName-ind-change" className="form-label">นามสกุล*</label><input type="text" id="lastName-ind-change" name="lastName" className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lastName}</div></div>
                            <div className="col-md-6"><label htmlFor="companyName-ind-change" className="form-label">ชื่อบริษัท</label><input type="text" id="companyName-ind-change" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /></div>
                            <div className="col-md-6"><label htmlFor="position-ind-change" className="form-label">ตำแหน่ง</label><input type="text" id="position-ind-change" name="position" className="form-control" value={formData.position} onChange={handleChange} /></div>
                            <div className="col-12"><label htmlFor="address-ind-change" className="form-label">ที่อยู่*</label><textarea id="address-ind-change" name="address" rows="3" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} required></textarea><div className="invalid-feedback">{formErrors.address}</div></div>
                            <div className="col-md-6"><label htmlFor="phone-ind-change" className="form-label">หมายเลขโทรศัพท์*</label><input type="tel" id="phone-ind-change" name="phone" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} maxLength="10" required /><div className="invalid-feedback">{formErrors.phone}</div></div>
                            <div className="col-md-6"><label htmlFor="email-ind-change" className="form-label">E-mail*</label><input type="email" id="email-ind-change" name="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.email}</div></div>
                            <div className="col-md-6"><label htmlFor="lineId-ind-change" className="form-label">Line-ID*</label><input type="text" id="lineId-ind-change" name="lineId" className={`form-control ${formErrors.lineId ? 'is-invalid' : ''}`} value={formData.lineId} onChange={handleChange} required /><div className="invalid-feedback">{formErrors.lineId}</div></div>
                            <div className="col-12 mt-4">
                                <label htmlFor="idCardCopy-change" className="form-label">อัปโหลดสำเนาบัตรประชาชน* <small className="text-muted ms-2">(เฉพาะไฟล์ .pdf ขนาดไม่เกิน 5MB)</small></label>
                                <input className={`form-control ${formErrors.idCardCopy ? 'is-invalid' : ''}`} type="file" id="idCardCopy-change" name="idCardCopy" onChange={handleChange} required accept="application/pdf"/>
                                <div className="invalid-feedback">{formErrors.idCardCopy}</div>
                            </div>
                            <div className="col-12 mt-5"><h5 className="fw-bold mb-3">เลือกระยะเวลาการสมัครสมาชิก*</h5><div className="row gy-3"><div className="col-md-6"><div className="membership-duration-option"><input className="form-check-input" type="radio" name="membershipDuration" id="yearly-ind-change" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange} /><label className="form-check-label h-100" htmlFor="yearly-ind-change"><strong>สมาชิกรายปี</strong><br />2,140 บาท (รวม vat 7%)</label></div></div><div className="col-md-6"><div className="membership-duration-option"><input className="form-check-input" type="radio" name="membershipDuration" id="lifetime-ind-change" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange} /><label className="form-check-label h-100" htmlFor="lifetime-ind-change"><strong>สมาชิกตลอดชีพ</strong><br />11,770 บาท (รวม vat 7%)</label></div></div></div></div>
                            <div className="col-12 mt-4"><div className="form-check"><input className="form-check-input" type="checkbox" id="acceptNews-ind-change" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /><label className="form-check-label" htmlFor="acceptNews-ind-change">ยินยอมรับข่าวสารและกิจกรรม</label></div></div>
                            <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"><button type="submit" className="btn btn-primary btn-lg px-5">ยืนยัน</button><Link to="/profile" className="btn btn-outline-secondary btn-lg px-5">ยกเลิก</Link></div>
                        </div>
                    </form>
                </div>
            </div>
            <PaymentModal show={showConfirmationModal} onHide={handleModalClose} />
        </>
    );
};

export default ChangePlanIndividualMemberForm;