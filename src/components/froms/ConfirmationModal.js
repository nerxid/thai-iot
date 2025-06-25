import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onHide, title, body, variant = 'success' }) => {
    
    const icons = {
        success: <CheckCircleFill className="confirmation-icon icon-success" />,
        warning: <ExclamationTriangleFill className="confirmation-icon icon-warning" />
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
            <Modal.Body className="confirmation-modal-body">
                <div className="text-center">
                    {icons[variant]}
                    <h3 className="confirmation-title">{title}</h3>
                    <p className="confirmation-text">{body}</p>
                    <Button variant="primary" onClick={onHide} className="mt-3 w-75">
                        รับทราบ
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmationModal;
