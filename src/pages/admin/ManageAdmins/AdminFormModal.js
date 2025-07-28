import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';

const AdminFormModal = ({ show, onHide, onSave, initialData }) => {
    const [formData, setFormData] = useState({});
    const isEditMode = initialData != null;

    const [formErrors, setFormErrors] = useState({});
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    useEffect(() => {
        setFormErrors({});
        setIsEditingPassword(false);
        setFormData(initialData || {
            firstName: '',
            lastName: '',
            email: '',
            role: 'Content Admin',
            password: '',
            confirmPassword: ''
        });
    }, [show, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSave = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName?.trim()) newErrors.firstName = 'กรุณากรอกชื่อ';
        if (!formData.lastName?.trim()) newErrors.lastName = 'กรุณากรอกนามสกุล';
        
        // << การตรวจสอบ Email อยู่ตรงนี้ >>
        if (!formData.email?.trim()) {
            newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }

        if (!isEditMode || isEditingPassword) {
            if (!formData.password) {
                newErrors.password = 'กรุณากรอกรหัสผ่าน';
            } else if (formData.password.length < 8) {
                newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
            } else if (!/[a-z]/.test(formData.password)) {
                newErrors.password = 'ต้องมีตัวอักษรพิมพ์เล็ก';
            } else if (!/[A-Z]/.test(formData.password)) {
                newErrors.password = 'ต้องมีตัวอักษรพิมพ์ใหญ่';
            } else if (!/[0-9]/.test(formData.password)) {
                newErrors.password = 'ต้องมีตัวเลข';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
            }
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSave(formData);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'แก้ไขข้อมูล Admin' : 'เพิ่ม Admin ใหม่'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate>
                    <Row>
                        <Col><Form.Group className="mb-3"><Form.Label>ชื่อ*</Form.Label><Form.Control type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} required isInvalid={!!formErrors.firstName} /><Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback></Form.Group></Col>
                        <Col><Form.Group className="mb-3"><Form.Label>นามสกุล*</Form.Label><Form.Control type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required isInvalid={!!formErrors.lastName} /><Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>E-mail*</Form.Label><Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} required isInvalid={!!formErrors.email} /><Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Role*</Form.Label><Form.Select name="role" value={formData.role || ''} onChange={handleChange}><option value="Content Admin">Content Admin</option><option value="Membership Admin">Membership Admin</option><option value="Contact Admin">Contact Admin</option><option value="Super Admin">Super Admin</option></Form.Select></Form.Group>
                    
                    {!isEditMode ? (
                        <Row>
                            <Col><Form.Group className="mb-3"><Form.Label>รหัสผ่าน*</Form.Label><Form.Control type="password" name="password" onChange={handleChange} required isInvalid={!!formErrors.password} /><Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>{!formErrors.password && <Form.Text muted>8 ตัวอักษรขึ้นไป, มีพิมพ์เล็ก, พิมพ์ใหญ่, ตัวเลข</Form.Text>}</Form.Group></Col>
                            <Col><Form.Group className="mb-3"><Form.Label>ยืนยันรหัสผ่าน*</Form.Label><Form.Control type="password" name="confirmPassword" onChange={handleChange} required isInvalid={!!formErrors.confirmPassword} /><Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback></Form.Group></Col>
                        </Row>
                    ) : (
                        <Form.Group className="mb-3">{!isEditingPassword ? (<Button variant="link" className="p-0" onClick={() => setIsEditingPassword(true)}>เปลี่ยนรหัสผ่าน</Button>) : (<Card className="p-3 bg-light border"><Row><Col><Form.Group className="mb-3"><Form.Label>รหัสผ่านใหม่*</Form.Label><Form.Control type="password" name="password" onChange={handleChange} required isInvalid={!!formErrors.password} /><Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>{!formErrors.password && <Form.Text muted>8+ ตัวอักษร, มีพิมพ์เล็ก, พิมพ์ใหญ่, ตัวเลข</Form.Text>}</Form.Group></Col><Col><Form.Group className="mb-3"><Form.Label>ยืนยันรหัสผ่านใหม่*</Form.Label><Form.Control type="password" name="confirmPassword" onChange={handleChange} required isInvalid={!!formErrors.confirmPassword} /><Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback></Form.Group></Col></Row><Button variant="link" size="sm" className="p-0 text-end text-muted" onClick={() => setIsEditingPassword(false)}>ยกเลิกการเปลี่ยน</Button></Card>)}</Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="primary" onClick={handleSave}>{isEditMode ? 'บันทึกการแก้ไข' : 'เพิ่ม Admin'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminFormModal;