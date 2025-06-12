
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CorporateMemberForm = () => {
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
        companyCertificate: null,
        acceptNews: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ส่งข้อมูล formData ไปยัง API 
        console.log('Submitting Corporate Data:', formData);
        alert('ส่งข้อมูลการสมัครสมาชิกเรียบร้อย!');
    };

    return (
        <div className="card p-4 p-md-5 border-0 shadow-lg" style={{ borderRadius: "20px", maxWidth: "900px", margin: "0 auto" }}>
            <div className="card-body">
                <h2 className="card-title text-center fw-bold mb-2">สมัครสมาชิกนิติบุคคล</h2>
                <p className="card-subtitle text-center text-muted mb-5">กรุณากรอกข้อมูลให้ครบถ้วน</p>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        
                        <div className="col-md-4">
                            <label htmlFor="prefix" className="form-label">คำนำหน้า*</label>
                            <select id="prefix" name="prefix" className="form-select" value={formData.prefix} onChange={handleChange} required>
                                <option value="">เลือก...</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="firstName" className="form-label">ชื่อ*</label>
                            <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lastName" className="form-label">นามสกุล*</label>
                            <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        
                        
                        <div className="col-md-6">
                            <label htmlFor="companyName" className="form-label">ชื่อบริษัท*</label>
                            <input type="text" id="companyName" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="position" className="form-label">ตำแหน่ง*</label>
                            <input type="text" id="position" name="position" className="form-control" value={formData.position} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">ที่อยู่*</label>
                            <textarea id="address" name="address" rows="3" className="form-control" value={formData.address} onChange={handleChange} required></textarea>
                        </div>

                        
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">หมายเลขโทรศัพท์*</label>
                            <input type="tel" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">E-mail*</label>
                            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lineId" className="form-label">Line-ID*</label>
                            <input type="text" id="lineId" name="lineId" className="form-control" value={formData.lineId} onChange={handleChange} required />
                        </div>

                        
                        <div className="col-12 mt-5">
                            <h5 className="fw-bold">เลือกระยะเวลาการสมัครสมาชิก*</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="membershipDuration" id="yearly" value="yearly" checked={formData.membershipDuration === 'yearly'} onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="yearly">
                                    สมาชิกรายปี 6,420 บาท (ราคารวม vat 7% แล้ว)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="membershipDuration" id="lifetime" value="lifetime" checked={formData.membershipDuration === 'lifetime'} onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="lifetime">
                                    สมาชิกตลอดชีพ 54,570 บาท (ราคารวม vat 7% แล้ว)
                                </label>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="companyCertificate" className="form-label">อัปโหลดใบหนังสือรับรอง*</label>
                            <input className="form-control" type="file" id="companyCertificate" name="companyCertificate" onChange={handleChange} required />
                        </div>
                        
                        
                        <div className="col-12 mt-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="acceptNews" name="acceptNews" checked={formData.acceptNews} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="acceptNews">
                                    ยินยอมรับข่าวสารและกิจกรรม
                                </label>
                            </div>
                        </div>

                        <div className="col-12 text-center mt-5 d-flex justify-content-center gap-3">
                            <button type="submit" className="btn btn-primary btn-lg px-5">สมัครสมาชิก</button>
                             <Link to="/register" className="btn btn-outline-secondary btn-lg px-5">
                                ยกเลิก
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CorporateMemberForm;