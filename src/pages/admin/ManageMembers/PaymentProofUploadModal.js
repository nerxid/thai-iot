import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // เอา Row, Col ออก
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
                    <Form.Group className="mb-3">
                        <Form.Label>รายละเอียดการชำระเงิน</Form.Label>
                        <Form.Control type="text" value={paymentDetails} onChange={e => setPaymentDetails(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>วันที่และเวลาชำระเงิน</Form.Label>
                        <DatePicker selected={paymentDate} onChange={date => setPaymentDate(date)} showTimeSelect dateFormat="Pp" className="form-control" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ธนาคาร</Form.Label>
                        <Form.Select value={bank} onChange={e => setBank(e.target.value)}>
                            <option value="">เลือกธนาคาร...</option>
                            <option value="SCB">ไทยพาณิชย์</option>
                            <option value="KBank">กสิกรไทย</option>
                            <option value="BBL">กรุงเทพ</option>
                            <option value="KTB">กรุงไทย</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>อัปโหลดหลักฐาน (.jpg, .png)</Form.Label>
                        <Form.Control type="file" onChange={e => setProofFile(e.target.files[0])} accept=".jpg,.png,.jpeg" />
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