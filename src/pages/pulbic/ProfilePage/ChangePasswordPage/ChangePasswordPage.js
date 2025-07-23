import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({}); 
        setSuccess('');

        const newErrors = {};
        const { currentPassword, newPassword, confirmPassword } = passwords;

        // ตรวจสอบช่องว่าง
        if (!currentPassword) newErrors.currentPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';
        if (!newPassword) newErrors.newPassword = 'กรุณากรอกรหัสผ่านใหม่';
        if (!confirmPassword) newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่านใหม่';

        // ตรวจสอบเงื่อนไขรหัสผ่านใหม่
        if (newPassword) {
            if (newPassword.length < 8) {
                newErrors.newPassword = 'รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร';
            } else if (!/[a-z]/.test(newPassword)) {
                newErrors.newPassword = 'ต้องมีตัวอักษรพิมพ์เล็ก';
            } else if (!/[A-Z]/.test(newPassword)) {
                newErrors.newPassword = 'ต้องมีตัวอักษรพิมพ์ใหญ่';
            } else if (!/[0-9]/.test(newPassword)) {
                newErrors.newPassword = 'ต้องมีตัวเลข';
            } else if (newPassword === currentPassword) {
                newErrors.newPassword = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน';
            }
        }
        
        // ตรวจสอบการยืนยันรหัสผ่าน
        if (newPassword && newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน';
        }

        setFormErrors(newErrors);

        // ถ้าไม่มี Error เลย ให้ดำเนินการต่อ
        if (Object.keys(newErrors).length === 0) {
            console.log('Changing password for user:', passwords);
            setSuccess('เปลี่ยนรหัสผ่านสำเร็จ! กำลังนำคุณกลับไปหน้าโปรไฟล์...');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        }
    };

    return (
        <div className="change-password-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 p-md-5 border-0 shadow-lg">
                            <Card.Body>
                                <h2 className="text-center fw-bold mb-4">เปลี่ยนรหัสผ่าน</h2>
                                <Form noValidate onSubmit={handleSubmit}>
                                    {success && <Alert variant="success">{success}</Alert>}

                                    <Form.Group className="mb-4" controlId="currentPassword">
                                        <Form.Label>รหัสผ่านปัจจุบัน*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="currentPassword"
                                            value={passwords.currentPassword}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.currentPassword}
                                            required 
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors.currentPassword}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="newPassword">
                                        <Form.Label>รหัสผ่านใหม่*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.newPassword}
                                            required 
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors.newPassword}</Form.Control.Feedback>
                                        <Form.Text muted>
                                            ต้องมี 8 ตัวอักษรขึ้นไป, ประกอบด้วยพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="confirmPassword">
                                        <Form.Label>ยืนยันรหัสผ่านใหม่*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.confirmPassword}
                                            required 
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-end mt-5">
                                        <Button variant="outline-secondary" as={Link} to="/profile">
                                            ยกเลิก
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            ยืนยันการเปลี่ยนแปลง
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ChangePasswordPage;