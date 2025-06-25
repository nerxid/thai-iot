import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import './MembershipForm.css';

const GeneralMemberForm = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({ prefix: '', firstName: '', lastName: '', companyName: '', position: '', address: '', phone: '', email: '', lineId: '', acceptNews: false, });
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
        const dataToSend = { ...formData };
        if (formData.prefix === 'อื่นๆ') {
            dataToSend.prefix = customPrefix;
        }
        console.log('Submitting General Member Data:', dataToSend);
        alert('ส่งข้อมูลการสมัครสมาชิกเรียบร้อย!');
        navigate('/');
    };

    return (
        <div className="card p-4 p-md-5 border-0 shadow-lg membership-form-card">
            <div className="card-body">
                <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกผู้สนใจทั่วไป</h2>
                <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label htmlFor="prefix-gen" className="form-label">คำนำหน้า*</label>
                            <select id="prefix-gen" name="prefix" className="form-select" value={formData.prefix} onChange={handleChange} required>
                                <option value="">เลือก...</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                                <option value="อื่นๆ">อื่นๆ...</option>
                            </select>
                        </div>
                        {formData.prefix === 'อื่นๆ' && (
                            <div className="col-md-4">
                                <label htmlFor="custom-prefix-gen" className="form-label">ระบุคำนำหน้า*</label>
                                <input type="text" id="custom-prefix-gen" className="form-control" value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." required />
                            </div>
                        )}
                        <div className="col-md-4"> <label htmlFor="firstName" className="form-label">ชื่อ*</label> <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required /> </div>
                        <div className="col-md-4"> <label htmlFor="lastName" className="form-label">นามสกุล*</label> <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required /> </div>
                        <div className="col-md-6"> <label htmlFor="companyName" className="form-label">ชื่อบริษัท</label> <input type="text" id="companyName" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /> </div>
                        <div className="col-md-6"> <label htmlFor="position" className="form-label">ตำแหน่ง</label> <input type="text" id="position" name="position" className="form-control" value={formData.position} onChange={handleChange} /> </div>
                        <div className="col-12"> <label htmlFor="address" className="form-label">ที่อยู่*</label> <textarea id="address" name="address" rows="3" className="form-control" value={formData.address} onChange={handleChange} required></textarea> </div>
                        <div className="col-md-6"> <label htmlFor="phone" className="form-label">หมายเลขโทรศัพท์*</label> <input type="tel" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} maxLength="10" pattern="[0-9]{10}" title="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก" required /> </div>
                        <div className="col-md-6"> <label htmlFor="email" className="form-label">E-mail*</label> <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required /> </div>
                        <div className="col-md-6"> <label htmlFor="lineId" className="form-label">Line-ID*</label> <input type="text" id="lineId" name="lineId" className="form-control" value={formData.lineId} onChange={handleChange} required /> </div>
                        <div className="col-12 mt-4"> <div className="form-check"> <input className="form-check-input" type="checkbox" id="acceptNews" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} /> <label className="form-check-label" htmlFor="acceptNews"> ยินยอมรับข่าวสารและกิจกรรม </label> </div> </div>
                        <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3 flex-wrap"> <button type="submit" className="btn btn-primary btn-lg px-5">สมัครสมาชิก</button> <Link to="/register" className="btn btn-outline-secondary btn-lg px-5"> ยกเลิก </Link> </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralMemberForm;