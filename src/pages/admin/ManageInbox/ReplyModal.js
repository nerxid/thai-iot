import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import TiptapEditor from '../../../components/admin/from/TiptapEditor'; 

const ReplyModal = ({ show, onHide, messageData, onSend }) => {
    const [replyContent, setReplyContent] = useState('');

    if (!messageData) return null;

    const handleSendReply = () => {
        onSend(replyContent);
        onHide();
    };

    const originalSubject = messageData.subject;
    const replySubject = `Re: ${originalSubject}`;

    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>ตอบกลับข้อความ</Modal.Title>
            </Modal.Header>
            <Modal.Body className="reply-modal-body">
                <Row className="mb-3 message-details">
                    <Col md={6}><strong>หัวข้อ:</strong> {originalSubject}</Col>
                    <Col md={6}><strong>ชื่อ-นามสกุล:</strong> {messageData.senderName}</Col>
                    <Col md={6}><strong>E-mail:</strong> {messageData.senderEmail}</Col>
                    <Col md={6}><strong>เบอร์โทรศัพท์:</strong> {messageData.senderPhone}</Col>
                </Row>
                <hr/>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>เรื่อง (ตอบกลับ):</strong></Form.Label>
                        <Form.Control type="text" value={replySubject} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>ข้อความตอบกลับ:</strong></Form.Label>
                        {/* หากไม่มี TiptapEditor ให้ใช้ <Form.Control as="textarea" rows={8} /> แทน */}
                        <TiptapEditor content={replyContent} setContent={setReplyContent} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="primary" onClick={handleSendReply}>เสร็จสิ้นและส่ง</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReplyModal;