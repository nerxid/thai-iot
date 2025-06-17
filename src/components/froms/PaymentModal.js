import React from 'react';

const PaymentModal = ({ show, onHide, onSubmit, memberType, formData }) => {
    if (!show) {
        return null;
    }

    const getPaymentDetails = () => {
        if (memberType === 'corporate') {
            return formData.membershipDuration === 'yearly'
                ? { amount: '6,420 บาท', type: 'สมาชิกรายปี' }
                : { amount: '54,570 บาท', type: 'สมาชิกตลอดชีพ' };
        }
        if (memberType === 'individual') {
            return formData.membershipDuration === 'yearly'
                ? { amount: '2,140 บาท', type: 'สมาชิกรายปี' }
                : { amount: '11,770 บาท', type: 'สมาชิกตลอดชีพ' };
        }
        return { amount: 'N/A', type: 'N/A' };
    };

    const paymentDetails = getPaymentDetails();

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ 
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}>
                    <div className="modal-header border-0 pb-0">
                        <div className="d-flex align-items-center">
                            <div className="me-3" style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#e3f2fd',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1976d2"/>
                                </svg>
                            </div>
                            <h5 className="modal-title fw-bold mb-0" style={{ color: '#1a1a1a' }}>ยืนยันการชำระเงิน</h5>
                        </div>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onHide}
                            style={{ 
                                backgroundColor: '#f5f5f5',
                                borderRadius: '50%',
                                padding: '0.5rem',
                                opacity: 0.7
                            }}
                        ></button>
                    </div>
                    
                    <div className="modal-body pt-3">
                        <p className="text-muted mb-4">กรุณาตรวจสอบรายละเอียดการชำระเงินก่อนดำเนินการ</p>
                        
                        <div className="card border-0" style={{ 
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                        }}>
                            <div className="row g-0">
                                <div className="col-12 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">ประเภทสมาชิก</span>
                                        <span className="fw-semibold">{paymentDetails.type}</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted">ยอดที่ต้องชำระ</span>
                                        <span className="fw-bold fs-5" style={{ color: '#1976d2' }}>
                                            {paymentDetails.amount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="alert alert-warning border-0" style={{ 
                            backgroundColor: '#fff3cd',
                            borderRadius: '8px',
                            padding: '1rem'
                        }}>
                            <div className="d-flex align-items-start">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2 mt-1" style={{ minWidth: '20px' }}>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#f57c00"/>
                                </svg>
                                <div>
                                    <small className="text-warning-emphasis">
                                        <strong>หมายเหตุ:</strong> นี่เป็นหน้าจำลองการชำระเงิน ในระบบจริงจะเชื่อมต่อกับ Payment Gateway
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer border-0 pt-0">
                        <div className="d-flex gap-2 w-100">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary flex-fill"
                                onClick={onHide}
                                style={{ 
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    fontWeight: '500'
                                }}
                            >
                                ยกเลิก
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary flex-fill"
                                onClick={onSubmit}
                                style={{ 
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    fontWeight: '500',
                                    backgroundColor: '#1976d2',
                                    borderColor: '#1976d2'
                                }}
                            >
                                ยืนยันการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;