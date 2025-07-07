import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Image, Breadcrumb, Alert } from 'react-bootstrap';
import { membersData } from '../../../data/mock-members';
import PaymentProofUploadModal from './PaymentProofUploadModal'; 
import './ManageMembers.css'; 

const MemberDetailPage = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        const memberInfo = membersData.find(m => m.id.toString() === memberId);
        if (memberInfo) {
            setMember(memberInfo);
        }
    }, [memberId]);

    const handleApproveDocument = () => {
        alert(`(Simulate) ส่งอีเมลแจ้งรายละเอียดการชำระเงินสำหรับแผน "${member.plan}" ให้ ${member.email} เรียบร้อย`);
        navigate('/admin/manage-members');
    };

    const handleRejectApplication = () => {
        const reason = prompt("กรุณาระบุเหตุผลที่ไม่อนุมัติ:");
        if (reason) {
            alert(`(Simulate) ส่งอีเมลแจ้งผลการไม่อนุมัติให้ ${member.email} เนื่องจาก: ${reason}`);
            navigate('/admin/manage-members');
        }
    };

    const handleRejectPayment = () => {
         const reason = prompt("กรุณาระบุเหตุผลที่ไม่อนุมัติหลักฐานการชำระเงิน:");
        if (reason) {
            alert(`(Simulate) ส่งอีเมลแจ้งเตือนการชำระเงินไม่ถูกต้องให้ ${member.email} เนื่องจาก: ${reason}`);
            navigate('/admin/manage-members');
        }
    }

    const handleSavePaymentProof = (proofData) => {
        console.log('หลักฐานการชำระเงินที่ต้องบันทึก:', proofData);
        alert(`(Simulate) อนุมัติและบันทึกหลักฐานการชำระเงินสำหรับ ${member.email} เรียบร้อย`);
        navigate('/admin/manage-members');
    };

    const renderExtraFields = () => {
        if (member.type !== 'paid') return null;

        return (
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>ใบหนังสือรับรอง*</Form.Label>
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

    const renderActionButtons = () => {
        if (member.type === 'free') {
             return (
                <>
                    <Button variant="primary" className="px-5">บันทึก</Button>
                    <Button variant="outline-secondary" className="px-5" onClick={() => navigate('/admin/manage-members')}>ยกเลิก</Button>
                </>
             );
        }

        switch (member.status) {
            case 'รอการอนุมัติเอกสาร':
                return (
                    <>
                        <Button variant="success" onClick={handleApproveDocument}>อนุมัติและส่งรายละเอียดการชำระเงิน</Button>
                        <Button variant="danger" onClick={handleRejectApplication}>ไม่อนุมัติการสมัครสมาชิก</Button>
                    </>
                );
            case 'รอการอนุมัติการชำระเงิน':
                return (
                    <>
                        <Button variant="primary" onClick={() => setShowUploadModal(true)}>อนุมัติและอัปโหลดหลักฐานการชำระเงิน</Button>
                        <Button variant="warning" onClick={handleRejectPayment}>ไม่อนุมัติหลักฐานการชำระเงิน</Button>
                    </>
                );
            case 'อนุมัติ':
                 return <Alert variant="success">สมาชิกคนนี้ได้รับการอนุมัติเรียบร้อยแล้ว</Alert>;
            default:
                return null;
        }
    };


    if (!member) {
        return <Container className="my-5 text-center"><h2>ไม่พบข้อมูลสมาชิก</h2></Container>;
    }

    return (
        <>
            <Container fluid className="manage-members-page">
                <div className="page-header">
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/manage-members" }}>จัดการสมาชิก</Breadcrumb.Item>
                        <Breadcrumb.Item active>รายละเอียดสมาชิก</Breadcrumb.Item>
                    </Breadcrumb>
                    <h2 className="page-title">รายละเอียดสมาชิก</h2>
                </div>

                <div className="list-container">
                    <Form>
                        <div className="text-center mb-5">
                            <div className="profile-image-placeholder mx-auto">
                                <span>{member.firstName.charAt(0)}</span>
                            </div>
                        </div>
                        <Row className="g-3">
                            <Col md={2}><Form.Group><Form.Label>คำนำหน้า*</Form.Label><Form.Control type="text" value={member.prefix} readOnly /></Form.Group></Col>
                            <Col md={5}><Form.Group><Form.Label>ชื่อ*</Form.Label><Form.Control type="text" value={member.firstName} readOnly /></Form.Group></Col>
                            <Col md={5}><Form.Group><Form.Label>นามสกุล*</Form.Label><Form.Control type="text" value={member.lastName} readOnly /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>ชื่อบริษัท/หน่วยงาน*</Form.Label><Form.Control type="text" value={member.organization || '-'} readOnly /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>ตำแหน่ง*</Form.Label><Form.Control type="text" value={member.position || '-'} readOnly /></Form.Group></Col>
                            <Col md={12}><Form.Group><Form.Label>ที่อยู่*</Form.Label><Form.Control as="textarea" rows={3} value={member.address} readOnly /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>หมายเลขโทรศัพท์*</Form.Label><Form.Control type="tel" value={member.phone} readOnly /></Form.Group></Col>
                             <Col md={6}><Form.Group><Form.Label>E-mail*</Form.Label><Form.Control type="email" value={member.email} readOnly /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>Line-ID*</Form.Label><Form.Control type="text" value={member.lineId} readOnly /></Form.Group></Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>ประเภทการสมัครสมาชิก</Form.Label>
                                    <Form.Control type="text" value={`${member.plan} (${member.type === 'free' ? 'ฟรี' : 'รายปี'})`} readOnly plaintext className="membership-type-display" />
                                </Form.Group>
                            </Col>
                        </Row>

                        {renderExtraFields()}

                        <Row className="mt-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>รหัสผ่าน</Form.Label>
                                    <div className="password-field-container">
                                        <Form.Control type="password" value="********" readOnly />
                                        <Button variant="link" className="change-password-btn">เปลี่ยนรหัสผ่าน</Button>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <div className="form-actions mt-5 text-center">
                            {renderActionButtons()}
                        </div>
                    </Form>
                </div>
            </Container>

            <PaymentProofUploadModal
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                onSave={handleSavePaymentProof}
            />
        </>
    );
};

export default MemberDetailPage;