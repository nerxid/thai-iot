import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './MembershipForm.css';

const IndividualMemberForm = () => {
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
    const [fileError, setFileError] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'idCardCopy') {
            const file = files[0];
            if (!file) return;
            const MAX_SIZE_MB = 5;
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
            const ALLOWED_TYPE = 'application/pdf';
            if (file.type !== ALLOWED_TYPE) {
                setFileError('กรุณาอัปโหลดไฟล์นามสกุล .pdf เท่านั้น');
                e.target.value = null; setFormData(prev => ({ ...prev, idCardCopy: null })); return;
            }
            if (file.size > MAX_SIZE_BYTES) {
                setFileError(`ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`);
                e.target.value = null; setFormData(prev => ({ ...prev, idCardCopy: null })); return;
            }
            setFileError(''); setFormData(prev => ({ ...prev, idCardCopy: file }));
        } else if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileError) {
            alert('กรุณาแก้ไขข้อผิดพลาดของไฟล์ก่อนทำการยืนยัน'); return;
        }
        const dataToSend = { ...formData };
        if (formData.prefix === 'อื่นๆ') {
            dataToSend.prefix = customPrefix;
        }
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
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <label htmlFor="prefix-ind" className="form-label">คำนำหน้า*</label>
                                <select id="prefix-ind" name="prefix" className="form-select" value={formData.prefix} onChange={handleChange} required>
                                    <option value="">เลือก...</option>
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                    <option value="อื่นๆ">อื่นๆ...</option>
                                </select>
                            </div>
                            {formData.prefix === 'อื่นๆ' && (
                                <div className="col-md-4">
                                    <label htmlFor="custom-prefix-ind" className="form-label">ระบุคำนำหน้า*</label>
                                    <input type="text" id="custom-prefix-ind" className="form-control" value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required />
                                </div>
                            )}
                            <div className="col-md-4"> <label htmlFor="firstName-ind" className="form-label">ชื่อ*</label> <input type="text" id="firstName-ind" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required /> </div>
                            <div className="col-md-4"> <label htmlFor="lastName-ind" className="form-label">นามสกุล*</label> <input type="text" id="lastName-ind" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required /> </div>
                            <div className="col-md-6"> <label htmlFor="companyName-ind" className="form-label">ชื่อบริษัท</label> <input type="text" id="companyName-ind" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /> </div>
                            <div className="col-md-6"> <label htmlFor="position-ind" className="form-label">ตำแหน่ง</label> <input type="text" id="position-ind" name="position" className="form-control" value={formData.position} onChange={handleChange} /> </div>
                            <div className="col-12"> <label htmlFor="address-ind" className="form-label">ที่อยู่*</label> <textarea id="address-ind" name="address" rows="3" className="form-control" value={formData.address} onChange={handleChange} required></textarea> </div>
                            <div className="col-md-6"> <label htmlFor="phone-ind" className="form-label">หมายเลขโทรศัพท์*</label> <input type="tel" id="phone-ind" name="phone" className="form-control" value={formData.phone} onChange={handleChange} maxLength="10" pattern="[0-9]{10}" title="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก" required /> </div>
                            <div className="col-md-6"> <label htmlFor="email-ind" className="form-label">E-mail*</label> <input type="email" id="email-ind" name="email" className="form-control" value={formData.email} onChange={handleChange} required /> </div>
                            <div className="col-md-6"> <label htmlFor="lineId-ind" className="form-label">Line-ID*</label> <input type="text" id="lineId-ind" name="lineId" className="form-control" value={formData.lineId} onChange={handleChange} required /> </div>
                            <div className="col-12 mt-4">
                                 <label htmlFor="idCardCopy-ind" className="form-label">อัปโหลดสำเนาบัตรประชาชน* <small className="text-muted ms-2">(เฉพาะไฟล์ .pdf ขนาดไม่เกิน 5MB)</small></label>
                                 <input className={`form-control ${fileError ? 'is-invalid' : ''}`} type="file" id="idCardCopy-ind" name="idCardCopy" onChange={handleChange} required accept="application/pdf"/>
                                 {fileError && <div className="invalid-feedback">{fileError}</div>}
                             </div>
                            <div className="col-12 mt-5">
                                 <h5 className="fw-bold mb-3">เลือกระยะเวลาการสมัครสมาชิก*</h5>
                                 <div className="row gy-3">
                                 <div className="col-md-6"> <div className="membership-duration-option"> <input className="form-check-input" type="radio" name="membershipDuration" id="yearly-ind" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange} /> <label className="form-check-label h-100" htmlFor="yearly-ind"> <strong>สมาชิกรายปี</strong><br />2,140 บาท (รวม vat 7%) </label> </div> </div>
                                     <div className="col-md-6"> <div className="membership-duration-option"> <input className="form-check-input" type="radio" name="membershipDuration" id="lifetime-ind" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange} /> <label className="form-check-label h-100" htmlFor="lifetime-ind"> <strong>สมาชิกตลอดชีพ</strong><br />11,770 บาท (รวม vat 7%) </label> </div> </div>
                                 </div>
                             </div>
                            <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews-ind" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews-ind"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                            <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"> <button type="submit" className="btn btn-primary btn-lg px-5">ยืนยันการสมัคร</button> <Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link> </div>
                        </div>
                    </form>
                </div>
            </div>

            <PaymentModal show={showConfirmationModal} onHide={handleModalClose} />
        </>
    );
};

export default IndividualMemberForm;