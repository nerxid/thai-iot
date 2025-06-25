import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import './PaymentModal.css';

const PaymentModal = ({ show, onHide }) => {

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
            <Modal.Body className="confirmation-modal-body">
                <div className="text-center">
                    <ExclamationTriangleFill className="confirmation-icon warning" />
                    <h3 className="confirmation-title">การสมัครสมาชิกเกือบเสร็จสมบูรณ์</h3>
                    <p className="confirmation-text">
                        ระบบได้บันทึกข้อมูลการสมัครของท่านเรียบร้อยแล้ว
                    </p>
                    <div className="confirmation-next-steps">
                        เจ้าหน้าที่จะทำการตรวจสอบข้อมูล และจะติดต่อกลับทางอีเมลที่ท่านได้ลงทะเบียนไว้เพื่อแจ้งรายละเอียดการชำระเงิน และการตั้งรหัสผ่านเพื่อเข้าสู่ระบบต่อไป
                    </div>
                    <Button variant="primary" onClick={onHide} className="mt-4 w-100">
                        รับทราบ
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;