import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        prefix: 'นาย',
        firstName: 'user',
        lastName: 'test',
        companyName: 'บริษัท ไทยไอโอที จำกัด',
        position: 'Developer',
        address: '123 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
        phone: '0812345678',
        email: 'test@test.com',
        lineId: 'thaiiot_test',
        membershipType: 'นิติบุคคล (รายปี)',
    });

    const [customPrefix, setCustomPrefix] = useState('');
    const [profileImage, setProfileImage] = useState('https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/9632107/mario.jpg?quality=90&strip=all&crop=0,3.6431064572426,100,92.713787085515');
    const [imagePreview, setImagePreview] = useState(profileImage);

    useEffect(() => {
        if (user) {
            setProfileData(prev => ({ ...prev, firstName: user.name }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'prefix' && value !== 'อื่นๆ') {
            setCustomPrefix('');
        }
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSubmit = { ...profileData };
        if (dataToSubmit.prefix === 'อื่นๆ') {
            dataToSubmit.prefix = customPrefix;
        }

        console.log("Updated Profile Data:", { ...dataToSubmit, profileImage });
        alert('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว');
    };

    return (
        <div className="profile-page-container">
            <Container>
                <h1 className="profile-page-title">แก้ไข Profile</h1>
                
                <Form onSubmit={handleSubmit} className="profile-form-card">
                    <div className="profile-picture-section">
                        <Image src={imagePreview} roundedCircle className="profile-image" />
                        <Form.Group controlId="profileImageUpload" className="mb-3">
                            <Form.Label className="profile-image-change-btn">
                                เปลี่ยนรูปภาพ
                            </Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
                        </Form.Group>
                    </div>

                    <Row className="g-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>คำนำหน้า*</Form.Label>
                                <Form.Select name="prefix" value={profileData.prefix} onChange={handleChange}>
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                    <option value="อื่นๆ">อื่นๆ...</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {profileData.prefix === 'อื่นๆ' && (
                            <Col md={3}>
                                 <Form.Group>
                                    <Form.Label>ระบุคำนำหน้า*</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={customPrefix} 
                                        onChange={(e) => setCustomPrefix(e.target.value)}
                                        placeholder="เช่น ดร., ผศ."
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        )}
                        
                        <Col md={profileData.prefix === 'อื่นๆ' ? 3 : 5}>
                            <Form.Group>
                                <Form.Label>ชื่อ*</Form.Label>
                                <Form.Control type="text" name="firstName" value={profileData.firstName} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={profileData.prefix === 'อื่นๆ' ? 4 : 5}>
                             <Form.Group>
                                <Form.Label>นามสกุล*</Form.Label>
                                <Form.Control type="text" name="lastName" value={profileData.lastName} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                             <Form.Group>
                                <Form.Label>ชื่อบริษัท*</Form.Label>
                                <Form.Control type="text" name="companyName" value={profileData.companyName} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group>
                                <Form.Label>ตำแหน่ง*</Form.Label>
                                <Form.Control type="text" name="position" value={profileData.position} onChange={handleChange} required />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                             <Form.Group>
                                <Form.Label>ที่อยู่*</Form.Label>
                                <Form.Control as="textarea" rows={3} name="address" value={profileData.address} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group>
                                <Form.Label>หมายเลขโทรศัพท์*</Form.Label>
                                <Form.Control type="tel" name="phone" value={profileData.phone} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group>
                                <Form.Label>E-mail*</Form.Label>
                                <Form.Control type="email" name="email" value={profileData.email} onChange={handleChange} required disabled />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group>
                                <Form.Label>Line-ID*</Form.Label>
                                <Form.Control type="text" name="lineId" value={profileData.lineId} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr className="my-4" />
                    <Row className="g-3 align-items-end">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>ประเภทการเป็นสมาชิก</Form.Label>
                                <Form.Control type="text" value={profileData.membershipType} disabled />
                            </Form.Group>
                        </Col>
                         <Col md={6}>
                            <Form.Group>
                                <Form.Label>ใบหนังสือรับรอง</Form.Label>
                                <Button variant="outline-secondary" className="w-100">ดูหนังสือรับรอง</Button>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control type="password" value="************" disabled />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Button 
                                variant="secondary" 
                                className="w-100" 
                                onClick={() => navigate('/change-password')}
                            >
                                เปลี่ยนรหัสผ่าน
                            </Button>
                        </Col>
                    </Row>
                    <hr className="my-4" />
                    <div className="profile-form-actions">
                        <Button variant="outline-primary" onClick={() => navigate('/register', { state: { flow: 'changePlan' } })}>
                            เปลี่ยนแผนสมาชิก
                        </Button>
                        <div>
                            <Button variant="secondary" as={Link} to="/" className="me-2">
                                ยกเลิก
                            </Button>
                            <Button variant="primary" type="submit">
                                บันทึก
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default ProfilePage;