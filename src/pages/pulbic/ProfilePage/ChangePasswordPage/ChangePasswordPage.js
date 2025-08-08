import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext'; // Adjust the path as needed
import axios from 'axios'; // Make sure to install axios
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({}); 
        setSuccess('');
        setError('');
        setIsSubmitting(true);

        const newErrors = {};
        const { currentPassword, newPassword, confirmPassword } = passwords;

        // Validation checks (same as before)
        if (!currentPassword) newErrors.currentPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';
        if (!newPassword) newErrors.newPassword = 'กรุณากรอกรหัสผ่านใหม่';
        if (!confirmPassword) newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่านใหม่';

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
        
        if (newPassword && newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน';
        }

        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
                function getCookie(name) {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop().split(';').shift();
                }
                const csrfToken = getCookie('csrftoken');
            const response = await axios.patch(
                `http://localhost:8000/api/accounts/users/${user.id}/`,
                {
                    current_password: currentPassword,
                    new_password: newPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRFToken": csrfToken,
                    }
                }
            );

            setSuccess('เปลี่ยนรหัสผ่านสำเร็จ! กำลังนำคุณกลับไปหน้าโปรไฟล์...');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    if (err.response.data.current_password) {
                        setError('รหัสผ่านปัจจุบันไม่ถูกต้อง');
                    } else {
                        setError('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน');
                    }
                } else if (err.response.status === 401) {
                    setError('กรุณาเข้าสู่ระบบอีกครั้ง');
                } else {
                    setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
                }
            } else {
                setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
            }
        } finally {
            setIsSubmitting(false);
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
                                    {error && <Alert variant="danger">{error}</Alert>}

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
                                        <Button variant="outline-secondary" as={Link} to="/profile" disabled={isSubmitting}>
                                            ยกเลิก
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการเปลี่ยนแปลง'}
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