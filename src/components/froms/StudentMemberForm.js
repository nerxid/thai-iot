import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MembershipForm.css';
import usePasswordValidation from './usePasswordValidation';

const StudentMemberForm = () => {
    const navigate = useNavigate();
    const { errors, validate } = usePasswordValidation();

    const [formData, setFormData] = useState({
        prefix: '',
        firstName: '',
        lastName: '',
        unitName: '',
        phone: '',
        email: '',
        lineId: '',
        password: '',
        confirmPassword: '',
        acceptNews: false,
    });
    const [customPrefix, setCustomPrefix] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isPasswordValid = validate(formData.password, formData.confirmPassword);
        
        if (!isPasswordValid) {
            alert('กรุณากรอกข้อมูลรหัสผ่านให้ถูกต้อง');
            return;
        }

        const dataToSend = { ...formData };
        if (formData.prefix === 'อื่นๆ') {
            dataToSend.prefix = customPrefix;
        }
        
        delete dataToSend.confirmPassword;

        console.log('Submitting Student Member Data:', dataToSend);
        alert('ส่งข้อมูลการสมัครสมาชิกเรียบร้อย!');
        navigate('/');
    };

    return (
        <div className="card p-4 p-md-5 border-0 shadow-lg membership-form-card">
            <div className="card-body">
                <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกนักเรียน/นิสิต/ครู/อาจารย์</h2>
                <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-4">
                        <div className="col-md-4"> <label htmlFor="prefix-stu" className="form-label">คำนำหน้า*</label> <select id="prefix-stu" name="prefix" className="form-select" value={formData.prefix} onChange={handleChange} required> <option value="">เลือก...</option> <option value="นาย">นาย</option> <option value="นาง">นาง</option> <option value="นางสาว">นางสาว</option> <option value="อื่นๆ">อื่นๆ...</option> </select> </div>
                        {formData.prefix === 'อื่นๆ' && ( <div className="col-md-4"> <label htmlFor="custom-prefix-stu" className="form-label">ระบุคำนำหน้า*</label> <input type="text" id="custom-prefix-stu" className="form-control" value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required /> </div> )}
                        <div className="col-md-4"> <label htmlFor="firstName" className="form-label">ชื่อ*</label> <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required /> </div>
                        <div className="col-md-4"> <label htmlFor="lastName" className="form-label">นามสกุล*</label> <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required /> </div>
                        <div className="col-12"> <label htmlFor="unitName" className="form-label">ชื่อหน่วยงาน/สถาบันการศึกษา*</label> <input type="text" id="unitName" name="unitName" className="form-control" placeholder="เช่น คณะวิศวกรรมศาสตร์, โรงเรียน..." value={formData.unitName} onChange={handleChange} required /> </div>
                        <div className="col-md-6"> <label htmlFor="phone" className="form-label">หมายเลขโทรศัพท์*</label> <input type="tel" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} maxLength="10" pattern="[0-9]{10}" title="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก" required /> </div>
                        <div className="col-md-6"> <label htmlFor="email" className="form-label">E-mail*</label> <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required /> </div>
                        <div className="col-md-6"> <label htmlFor="lineId" className="form-label">Line-ID*</label> <input type="text" id="lineId" name="lineId" className="form-control" value={formData.lineId} onChange={handleChange} required /> </div>

                        <div className="col-md-6">
                            <label htmlFor="password-stu" className="form-label">รหัสผ่าน*</label>
                            <input
                                type="password"
                                id="password-stu"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                             <small className="form-text text-muted">
                                อย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, พิมพ์ใหญ่, ตัวเลข, และอักขระพิเศษ
                            </small>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword-stu" className="form-label">ยืนยันรหัสผ่าน*</label>
                            <input
                                type="password"
                                id="confirmPassword-stu"
                                name="confirmPassword"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        
                        <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                        <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"> <button type="submit" className="btn btn-primary btn-lg px-5">สมัครสมาชิก</button> <Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link> </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default StudentMemberForm;