import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AdminFormModal = ({ show, onHide, onSave, initialData }) => {
    const [formData, setFormData] = useState({});
    const isEditMode = initialData != null;

    useEffect(() => {
        setFormData(initialData || {
            firstName: '',
            lastName: '',
            email: '',
            role: 'Content Admin', // Default role
            password: '',
            confirmPassword: ''
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!isEditMode && formData.password !== formData.confirmPassword) {
            alert('รหัสผ่านไม่ตรงกัน');
            return;
        }
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'แก้ไขข้อมูล Admin' : 'เพิ่ม Admin ใหม่'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col><Form.Group className="mb-3"><Form.Label>ชื่อ*</Form.Label><Form.Control type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} required /></Form.Group></Col>
                        <Col><Form.Group className="mb-3"><Form.Label>นามสกุล*</Form.Label><Form.Control type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required /></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>E-mail*</Form.Label><Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Role*</Form.Label>
                        <Form.Select name="role" value={formData.role || ''} onChange={handleChange}>
                            <option value="Content Admin">Content Admin</option>
                            <option value="Membership Admin">Membership Admin</option>
                            <option value="Contact Admin">Contact Admin</option>
                            <option value="Super Admin">Super Admin</option>
                        </Form.Select>
                    </Form.Group>
                    {!isEditMode && (
                        <Row>
                            <Col><Form.Group className="mb-3"><Form.Label>รหัสผ่าน*</Form.Label><Form.Control type="password" name="password" onChange={handleChange} required /></Form.Group></Col>
                            <Col><Form.Group className="mb-3"><Form.Label>ยืนยันรหัสผ่าน*</Form.Label><Form.Control type="password" name="confirmPassword" onChange={handleChange} required /></Form.Group></Col>
                        </Row>
                    )}
                     {isEditMode && (
                        <Button variant="link" className="p-0">เปลี่ยนรหัสผ่าน</Button>
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