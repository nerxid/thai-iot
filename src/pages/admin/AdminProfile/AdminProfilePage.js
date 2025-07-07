import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { currentAdminData } from '../../../data/mock-current-admin';
import './AdminProfile.css';

const AdminProfilePage = () => {
    const [profile, setProfile] = useState(currentAdminData);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: 'success', text: 'บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!' });
        console.log('Updated Profile:', profile);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'danger', text: 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน!' });
            return;
        }
        if (passwords.new.length < 8) {
            setMessage({ type: 'danger', text: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร!' });
            return;
        }
        setMessage({ type: 'success', text: 'เปลี่ยนรหัสผ่านสำเร็จ!' });
        console.log('Password Change Request:', passwords);
        setPasswords({ current: '', new: '', confirm: '' }); 
    };

    return (
        <Container fluid className="admin-profile-page">
            <h2 className="profile-page-title">ประวัติส่วนตัว</h2>
            {message.text && <Alert variant={message.type} onClose={() => setMessage({type:'', text:''})} dismissible>{message.text}</Alert>}

            <Row>
                <Col xl={4}>
                    <Card className="profile-card mb-4">
                        <Card.Body className="avatar-section">
                            <Image src={avatarPreview} roundedCircle className="profile-avatar" />
                            <h4 className="fw-bold mt-2">{`${profile.firstName} ${profile.lastName}`}</h4>
                            <p className="text-muted">{profile.role}</p>
                            <Button as="label" htmlFor="avatar-upload" variant="primary" size="sm">เปลี่ยนรูปโปรไฟล์</Button>
                            <Form.Control type="file" id="avatar-upload" onChange={handleAvatarChange} hidden accept="image/*" />
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={8}>
                    <Card className="profile-card mb-4 form-section">
                        <Card.Body>
                            <h5 className="mb-4">แก้ไขข้อมูลโปรไฟล์</h5>
                            <Form onSubmit={handleProfileSubmit}>
                                <Row>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Label>ชื่อ</Form.Label><Form.Control type="text" name="firstName" value={profile.firstName} onChange={handleProfileChange} /></Form.Group></Col>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Label>นามสกุล</Form.Label><Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleProfileChange} /></Form.Group></Col>
                                </Row>
                                <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" value={profile.email} readOnly /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Role</Form.Label><Form.Control type="text" value={profile.role} readOnly /></Form.Group>
                                <div className="form-actions">
                                    <Button variant="primary" type="submit">บันทึกการเปลี่ยนแปลง</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="profile-card mb-4 form-section">
                        <Card.Body>
                            <h5 className="mb-4">เปลี่ยนรหัสผ่าน</h5>
                            <Form onSubmit={handlePasswordSubmit}>
                                <Form.Group className="mb-3"><Form.Label>รหัสผ่านปัจจุบัน</Form.Label><Form.Control type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required /></Form.Group>
                                <Row>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Label>รหัสผ่านใหม่</Form.Label><Form.Control type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required /></Form.Group></Col>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label><Form.Control type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required /></Form.Group></Col>
                                </Row>
                                <div className="form-actions">
                                    <Button variant="secondary" type="submit">เปลี่ยนรหัสผ่าน</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminProfilePage;