import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentProofUploadModal = ({ show, onHide, onSave }) => {
    const [paymentDetails, setPaymentDetails] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [bank, setBank] = useState('');
    const [proofFile, setProofFile] = useState(null);

    const [fileError, setFileError] = useState('');

    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!file) return 'กรุณาเลือกไฟล์';
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg, .png, หรือ .jpeg เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError(''); // เคลียร์ error เก่า

        if (!file) {
            setProofFile(null);
            return;
        }
        
        const error = validateFile(file);
        if (error) {
            setFileError(error);
            e.target.value = null; // ล้างค่าใน input
            setProofFile(null);
            return;
        }

        // ถ้าไฟล์ถูกต้อง
        setProofFile(file);
    };

    const handleSave = () => {
        if (!proofFile || fileError) {
            setFileError('กรุณาอัปโหลดหลักฐานการชำระเงินให้ถูกต้อง');
            return;
        }
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
                        <DatePicker selected={paymentDate} onChange={date => setPaymentDate(date)} showTimeSelect dateFormat="Pp" className="form-control" portalId="datepicker-portal"/>
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
                        <Form.Label>อัปโหลดหลักฐาน (.jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</Form.Label>
                        <Form.Control 
                            type="file" 
                            onChange={handleFileChange} 
                            accept=".jpg,.png,.jpeg"
                            isInvalid={!!fileError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {fileError}
                        </Form.Control.Feedback>
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