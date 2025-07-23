import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { currentAdminData } from '../../../data/mock-current-admin';
import './AdminProfile.css';

const AdminProfilePage = () => {
    const [profile, setProfile] = useState(currentAdminData);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    
    const [avatar, setAvatar] = useState({ file: null, preview: profile.avatarUrl });
    const [formErrors, setFormErrors] = useState({});

    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!file) return 'กรุณาอัปโหลดรูปภาพ';
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setFormErrors(prev => ({ ...prev, avatar: null }));

        if (!file) return;

        const error = validateFile(file);
        if (error) {
            setFormErrors(prev => ({ ...prev, avatar: error }));
            e.target.value = null;
            return;
        }
        setAvatar({ file: file, preview: URL.createObjectURL(file) });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!profile.firstName.trim()) newErrors.firstName = 'กรุณากรอกชื่อ';
        if (!profile.lastName.trim()) newErrors.lastName = 'กรุณากรอกนามสกุล';
        if (!avatar.preview && !avatar.file) newErrors.avatar = 'กรุณาอัปโหลดรูปโปรไฟล์';
        
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setFormErrors({ successMessage: 'บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!' });
            console.log('Updated Profile:', { profile, avatarFile: avatar.file });
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!passwords.current) newErrors.current = 'กรุณากรอกรหัสผ่านปัจจุบัน';
        if (!passwords.new) {
            newErrors.new = 'กรุณากรอกรหัสผ่านใหม่';
        } else if (passwords.new.length < 8) {
            newErrors.new = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
        } else if (!/[a-z]/.test(passwords.new) || !/[A-Z]/.test(passwords.new) || !/[0-9]/.test(passwords.new)) {
            newErrors.new = 'ต้องมีทั้งพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข';
        }

        if (passwords.new !== passwords.confirm) {
            newErrors.confirm = 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน';
        }
        
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setFormErrors({ successMessage: 'เปลี่ยนรหัสผ่านสำเร็จ!' });
            console.log('Password Change Request:', passwords);
            setPasswords({ current: '', new: '', confirm: '' }); 
        }
    };

    return (
        <Container fluid className="admin-profile-page">
            <h2 className="profile-page-title">ประวัติส่วนตัว</h2>
            
            {formErrors.successMessage && <Alert variant="success" onClose={() => setFormErrors({})} dismissible>{formErrors.successMessage}</Alert>}
            
            <Row>
                <Col xl={4}>
                    <Card className="profile-card mb-4">
                        <Card.Body className="avatar-section">
                            <Image src={avatar.preview} roundedCircle className="profile-avatar" />
                            <h4 className="fw-bold mt-2">{`${profile.firstName} ${profile.lastName}`}</h4>
                            <p className="text-muted">{profile.role}</p>
                            <Button as="label" htmlFor="avatar-upload" variant="primary" size="sm">เปลี่ยนรูปโปรไฟล์</Button>
                            <Form.Control type="file" id="avatar-upload" onChange={handleAvatarChange} hidden accept=".jpg,.png,.jpeg" />
                            {formErrors.avatar && <div className="d-block invalid-feedback mt-2">{formErrors.avatar}</div>}
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={8}>
                    <Card className="profile-card mb-4 form-section">
                        <Card.Body>
                            <h5 className="mb-4">แก้ไขข้อมูลโปรไฟล์</h5>
                            <Form noValidate onSubmit={handleProfileSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>ชื่อ*</Form.Label>
                                            <Form.Control type="text" name="firstName" value={profile.firstName} onChange={handleProfileChange} isInvalid={!!formErrors.firstName} />
                                            <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>นามสกุล*</Form.Label>
                                            <Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleProfileChange} isInvalid={!!formErrors.lastName} />
                                            <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
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
                            <Form noValidate onSubmit={handlePasswordSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>รหัสผ่านปัจจุบัน*</Form.Label>
                                    <Form.Control type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required isInvalid={!!formErrors.current} />
                                    <Form.Control.Feedback type="invalid">{formErrors.current}</Form.Control.Feedback>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>รหัสผ่านใหม่*</Form.Label>
                                            <Form.Control type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required isInvalid={!!formErrors.new} />
                                            <Form.Control.Feedback type="invalid">{formErrors.new}</Form.Control.Feedback>
                                            {!formErrors.new && <Form.Text muted>8 ตัวอักษรขึ้นไป, มีพิมพ์เล็ก, พิมพ์ใหญ่, ตัวเลข</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>ยืนยันรหัสผ่านใหม่*</Form.Label>
                                            <Form.Control type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required isInvalid={!!formErrors.confirm} />
                                            <Form.Control.Feedback type="invalid">{formErrors.confirm}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
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