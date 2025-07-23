import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import { membersData } from '../../../data/mock-members';
import './ManageMembers.css'; 

const MemberDetailPage = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    
    const [formData, setFormData] = useState({ email: '' });
    const [passwordData, setPasswordData] = useState({ password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({});
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    useEffect(() => {
        const memberInfo = membersData.find(m => m.id.toString() === memberId);
        if (memberInfo) {
            setMember(memberInfo);
            setFormData({ email: memberInfo.email });
        }
    }, [memberId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSave = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // ตรวจสอบ Email
        if (!formData.email.trim()) {
            newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }

        // ตรวจสอบรหัสผ่าน (เฉพาะเมื่อกำลังแก้ไขรหัสผ่าน)
        if (isEditingPassword) {
            const { password, confirmPassword } = passwordData;
            if (!password) {
                newErrors.password = 'กรุณากรอกรหัสผ่านใหม่';
            } else if (password.length < 8) {
                newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
            } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
                newErrors.password = 'ต้องมีทั้งตัวอักษรพิมพ์เล็กและพิมพ์ใหญ่';
            
            } else if (!/[0-9]/.test(password)) {
                newErrors.password = 'ต้องมีตัวเลขอย่างน้อย 1 ตัว';
            }

            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
            }
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('บันทึกข้อมูลสมาชิกสำเร็จ!');
            console.log("Updated data:", { email: formData.email, passwords: passwordData });
            navigate('/admin/manage-members');
        }
    };

    const renderExtraFields = () => {
        if (!member || member.type !== 'paid' || !member.documentUrl) return null;
        return (
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>ใบหนังสือรับรอง</Form.Label>
                        <div>
                            <a href={member.documentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-sm">
                                กดเพื่อดูใบหนังสือรับรอง
                            </a>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        );
    };

    if (!member) {
        return <Container className="my-5 text-center"><h2>ไม่พบข้อมูลสมาชิก</h2></Container>;
    }

    return (
        <Container fluid className="manage-members-page">
            <div className="page-header">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/manage-members" }}>จัดการสมาชิก</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายละเอียดสมาชิก</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className="page-title">รายละเอียดสมาชิก</h2>
            </div>

            <div className="list-container">
                <Form noValidate>
                    <div className="text-center mb-5">
                        <div className="profile-image-placeholder mx-auto">
                            <span>{member.firstName.charAt(0)}</span>
                        </div>
                    </div>
                    <Row className="g-3">
                        {/* --- ส่วนข้อมูลที่แก้ไขไม่ได้ --- */}
                        <Col md={2}><Form.Group><Form.Label>คำนำหน้า</Form.Label><Form.Control type="text" value={member.prefix} readOnly /></Form.Group></Col>
                        <Col md={5}><Form.Group><Form.Label>ชื่อ</Form.Label><Form.Control type="text" value={member.firstName} readOnly /></Form.Group></Col>
                        <Col md={5}><Form.Group><Form.Label>นามสกุล</Form.Label><Form.Control type="text" value={member.lastName} readOnly /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>ชื่อบริษัท/หน่วยงาน</Form.Label><Form.Control type="text" value={member.organization || '-'} readOnly /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>ตำแหน่ง</Form.Label><Form.Control type="text" value={member.position || '-'} readOnly /></Form.Group></Col>
                        <Col md={12}><Form.Group><Form.Label>ที่อยู่</Form.Label><Form.Control as="textarea" rows={3} value={member.address} readOnly /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>หมายเลขโทรศัพท์</Form.Label><Form.Control type="tel" value={member.phone} readOnly /></Form.Group></Col>
                        
                        {/* --- ส่วนข้อมูลที่แก้ไขได้ --- */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>E-mail*</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    value={formData.email} 
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.email}
                                />
                                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}><Form.Group><Form.Label>Line-ID</Form.Label><Form.Control type="text" value={member.lineId} readOnly /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>ประเภทการสมัคร</Form.Label><Form.Control type="text" value={`${member.plan} (${member.type === 'free' ? 'ฟรี' : 'รายปี'})`} readOnly plaintext className="membership-type-display" /></Form.Group></Col>
                    </Row>

                    {renderExtraFields()}

                    <Row className="mt-3">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>รหัสผ่าน</Form.Label>
                                {!isEditingPassword ? (
                                    <div className="password-field-container">
                                        <Form.Control type="password" value="********" readOnly />
                                        <Button variant="link" className="change-password-btn" onClick={() => setIsEditingPassword(true)}>
                                            เปลี่ยนรหัสผ่าน
                                        </Button>
                                    </div>
                                ) : (
                                    <Card className="p-3 bg-light border">
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Label>รหัสผ่านใหม่*</Form.Label>
                                                <Form.Control 
                                                    type="password" 
                                                    name="password"
                                                    value={passwordData.password}
                                                    onChange={handlePasswordChange}
                                                    isInvalid={!!formErrors.password}
                                                    placeholder="กรอกรหัสผ่านใหม่"
                                                />
                                                <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
                                                <Form.Text muted>ต้องมี 8 ตัวอักษรขึ้นไป, ประกอบด้วยพิมพ์เล็ก, พิมพ์ใหญ่, และตัวเลข</Form.Text>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>ยืนยันรหัสผ่านใหม่*</Form.Label>
                                                <Form.Control 
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    isInvalid={!!formErrors.confirmPassword}
                                                    placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                                                />
                                                 <Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <Button variant="link" size="sm" className="mt-2 text-end text-muted" onClick={() => setIsEditingPassword(false)}>
                                            ยกเลิกการเปลี่ยนรหัสผ่าน
                                        </Button>
                                    </Card>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <div className="form-actions mt-5 text-center">
                        <Button variant="outline-secondary" className="px-5" onClick={() => navigate('/admin/manage-members')}>ยกเลิก</Button>
                        <Button variant="primary" className="px-5" onClick={handleSave}>บันทึกการแก้ไข</Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default MemberDetailPage;