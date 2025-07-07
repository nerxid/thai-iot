import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentProofUploadModal = ({ show, onHide, onSave }) => {
    const [paymentDetails, setPaymentDetails] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [bank, setBank] = useState('');
    const [proofFile, setProofFile] = useState(null);

    const handleSave = () => {
        onSave({
            details: paymentDetails,
            date: paymentDate,
            bank: bank,
            file: proofFile,
        });
        onHide();
    };
    
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>อัปโหลดหลักฐานการชำระเงิน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">รายละเอียดการชำระเงิน</Form.Label>
                        <Col sm="9"><Form.Control type="text" value={paymentDetails} onChange={e => setPaymentDetails(e.target.value)} /></Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">วันที่และเวลาชำระเงิน</Form.Label>
                        <Col sm="9"><DatePicker selected={paymentDate} onChange={date => setPaymentDate(date)} showTimeSelect dateFormat="Pp" className="form-control" /></Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">ธนาคาร</Form.Label>
                        <Col sm="9">
                            <Form.Select value={bank} onChange={e => setBank(e.target.value)}>
                                <option value="">เลือกธนาคาร...</option>
                                <option value="SCB">ไทยพาณิชย์</option>
                                <option value="KBank">กสิกรไทย</option>
                                <option value="BBL">กรุงเทพ</option>
                                <option value="KTB">กรุงไทย</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">อัปโหลดหลักฐาน (.jpg, .png)</Form.Label>
                        <Col sm="9"><Form.Control type="file" onChange={e => setProofFile(e.target.files[0])} accept=".jpg,.png,.jpeg" /></Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="primary" onClick={handleSave}>บันทึก</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentProofUploadModal;