import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MembershipForm.css';
import usePasswordValidation from './usePasswordValidation'; 

const GeneralMemberForm = () => {
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
        acceptNews: false,
    });
    const [customPrefix, setCustomPrefix] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
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
        if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
        if (!formData.email) newErrors.email = 'กรุณากรอกอีเมล';
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

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const dataToSend = { ...formData, prefix: formData.prefix === 'อื่นๆ' ? customPrefix : formData.prefix };
            delete dataToSend.confirmPassword;
            console.log('Submitting General Member Data:', dataToSend);
            alert('ส่งข้อมูลการสมัครสมาชิกเรียบร้อย!');
            navigate('/');
        }
    };

    return (
        <div className="card p-4 p-md-5 border-0 shadow-lg membership-form-card">
            <div className="card-body">
                <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกผู้สนใจทั่วไป</h2>
                <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label htmlFor="prefix-gen" className="form-label">คำนำหน้า*</label>
                            <select id="prefix-gen" name="prefix" className={`form-select ${formErrors.prefix ? 'is-invalid' : ''}`} value={formData.prefix} onChange={handleChange} required>
                                <option value="">เลือก...</option><option value="นาย">นาย</option><option value="นาง">นาง</option><option value="นางสาว">นางสาว</option><option value="อื่นๆ">อื่นๆ...</option>
                            </select>
                            {formErrors.prefix && <div className="invalid-feedback">{formErrors.prefix}</div>}
                        </div>
                        {formData.prefix === 'อื่นๆ' && ( <div className="col-md-4">
                            <label htmlFor="custom-prefix-gen" className="form-label">ระบุคำนำหน้า*</label>
                            <input type="text" id="custom-prefix-gen" className={`form-control ${formErrors.customPrefix ? 'is-invalid' : ''}`} value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required />
                            {formErrors.customPrefix && <div className="invalid-feedback">{formErrors.customPrefix}</div>}
                        </div> )}
                        <div className="col-md-4">
                            <label htmlFor="firstName" className="form-label">ชื่อ*</label>
                            <input type="text" id="firstName" name="firstName" className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} required />
                            {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lastName" className="form-label">นามสกุล*</label>
                            <input type="text" id="lastName" name="lastName" className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} required />
                            {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                        </div>
                        <div className="col-md-6"> <label htmlFor="companyName" className="form-label">ชื่อบริษัท</label> <input type="text" id="companyName" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /> </div>
                        <div className="col-md-6"> <label htmlFor="position" className="form-label">ตำแหน่ง</label> <input type="text" id="position" name="position" className="form-control" value={formData.position} onChange={handleChange} /> </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">ที่อยู่*</label>
                            <textarea id="address" name="address" rows="3" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} required></textarea>
                            {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">หมายเลขโทรศัพท์*</label>
                            <input type="tel" id="phone" name="phone" className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} maxLength="10" required />
                            {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">E-mail*</label>
                            <input type="email" id="email" name="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} required />
                            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lineId" className="form-label">Line-ID*</label>
                            <input type="text" id="lineId" name="lineId" className={`form-control ${formErrors.lineId ? 'is-invalid' : ''}`} value={formData.lineId} onChange={handleChange} required />
                            {formErrors.lineId && <div className="invalid-feedback">{formErrors.lineId}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password-gen" className="form-label">รหัสผ่าน*</label>
                            <input type="password" id="password-gen" name="password" className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleChange} required />
                            {formErrors.password ? <div className="invalid-feedback">{formErrors.password}</div> : <small className="form-text text-muted">อย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข</small>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword-gen" className="form-label">ยืนยันรหัสผ่าน*</label>
                            <input type="password" id="confirmPassword-gen" name="confirmPassword" className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleChange} required />
                            {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                        </div>
                        <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                        <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
                            <button type="submit" className="btn btn-primary btn-lg px-5">สมัครสมาชิก</button>
                            <Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralMemberForm;