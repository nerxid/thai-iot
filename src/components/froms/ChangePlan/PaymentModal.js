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
                    <h3 className="confirmation-title">ส่งคำขอเปลี่ยนแผนสำเร็จ</h3>
                    <p className="confirmation-text">
                        ระบบได้ส่งคำขอเปลี่ยนแผนสมาชิกของท่านเรียบร้อยแล้ว
                    </p>
                    <div className="confirmation-next-steps">
                        เจ้าหน้าที่จะทำการตรวจสอบและจะติดต่อกลับทางอีเมลเพื่อแจ้งรายละเอียดการชำระเงินสำหรับแผนใหม่ และยืนยันการเปลี่ยนแปลงในลำดับถัดไป
                    </div>
                    <Button variant="primary" onClick={onHide} className="mt-4 w-100 confirmation-btn">
                        รับทราบ
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
