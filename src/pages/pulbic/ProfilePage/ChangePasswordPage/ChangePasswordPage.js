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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }
        if (passwords.newPassword.length < 8) {
            setError('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }
        if (passwords.newPassword === passwords.currentPassword) {
            setError('รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน');
            return;
        }

        // --- Backend Integration (Simulation) ---
        // TODO: ในระบบจริง ส่วนนี้จะต้องเรียก API ไปยัง Backend เพื่อตรวจสอบรหัสผ่านปัจจุบันและอัปเดตข้อมูล
        console.log('Changing password for user:', passwords);
        
        setSuccess('เปลี่ยนรหัสผ่านสำเร็จ!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

        setTimeout(() => {
            navigate('/profile');
        }, 3000);
    };

    return (
        <div className="change-password-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 p-md-5 border-0 shadow-lg">
                            <Card.Body>
                                <h2 className="text-center fw-bold mb-4">เปลี่ยนรหัสผ่าน</h2>
                                <Form onSubmit={handleSubmit}>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {success && <Alert variant="success">{success}</Alert>}

                                    <Form.Group className="mb-4" controlId="currentPassword">
                                        <Form.Label>รหัสผ่านปัจจุบัน*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="currentPassword"
                                            value={passwords.currentPassword}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="newPassword">
                                        <Form.Label>รหัสผ่านใหม่*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <Form.Text muted>
                                            ต้องมีความยาวอย่างน้อย 8 ตัวอักษร
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="confirmPassword">
                                        <Form.Label>ยืนยันรหัสผ่านใหม่*</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handleChange}
                                            required 
                                        />
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