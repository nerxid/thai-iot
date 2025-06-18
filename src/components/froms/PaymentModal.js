import React from 'react';
import './PaymentModal.css';

const PaymentModal = ({ show, onHide, onSubmit, memberType, formData }) => {
    
    const getPaymentDetails = () => {
        if (memberType === 'corporate') {
            return formData.membershipDuration === 'yearly'
                ? { amount: '6,420 บาท', type: 'สมาชิกรายปี (นิติบุคคล)' }
                : { amount: '54,570 บาท', type: 'สมาชิกตลอดชีพ (นิติบุคคล)' };
        }
        if (memberType === 'individual') {
            return formData.membershipDuration === 'yearly'
                ? { amount: '2,140 บาท', type: 'สมาชิกรายปี (บุคคลธรรมดา)' }
                : { amount: '11,770 บาท', type: 'สมาชิกตลอดชีพ (บุคคลธรรมดา)' };
        }
        return { amount: 'N/A', type: 'N/A' };
    };

    const paymentDetails = getPaymentDetails();

    return (
        <div className={`payment-modal-backdrop ${show ? 'show' : ''}`} onClick={onHide}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content payment-modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header border-0 pb-0">
                        <div className="d-flex align-items-center">
                            <div className="me-3 payment-modal-header-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1976d2"/>
                                </svg>
                            </div>
                            <h5 className="modal-title fw-bold mb-0">ยืนยันการชำระเงิน</h5>
                        </div>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    
                    <div className="modal-body pt-3">
                        <p className="text-muted mb-4">กรุณาตรวจสอบรายละเอียดก่อนดำเนินการต่อ</p>
                        
                        <div className="card border-0 payment-modal-details">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">ประเภทสมาชิก</span>
                                <span className="fw-semibold">{paymentDetails.type}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">ยอดที่ต้องชำระ</span>
                                <span className="fw-bold fs-5 payment-amount">{paymentDetails.amount}</span>
                            </div>
                        </div>
                        
                        <div className="alert alert-warning border-0 small">
                            <strong>หมายเหตุ:</strong> นี่เป็นหน้าจำลองการชำระเงิน ในระบบจริงจะเชื่อมต่อกับ Payment Gateway
                        </div>
                    </div>
                    
                    <div className="modal-footer border-0 pt-0">
                        <div className="d-flex gap-2 w-100">
                            <button type="button" className="btn btn-outline-secondary flex-fill" onClick={onHide}>ยกเลิก</button>
                            <button type="button" className="btn btn-primary flex-fill" onClick={onSubmit}>ยืนยันการชำระเงิน</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;