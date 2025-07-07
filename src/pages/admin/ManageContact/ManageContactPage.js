import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { mockContactData } from '../../../data/mock-contact-info';
import './ManageContact.css';

const ManageContactPage = () => {
    const [contactInfo, setContactInfo] = useState(mockContactData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Contact Info:', contactInfo);
        alert('บันทึกข้อมูลการติดต่อสำเร็จ!');
    };

    return (
        <Container fluid className="manage-contact-page">
            <h2 className="page-title">จัดการข้อมูลติดต่อ</h2>

            <div className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ที่ตั้งสมาคม*</Form.Label>
                        <Form.Control as="textarea" rows={3} name="address" value={contactInfo.address} onChange={handleChange} required />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>โทรศัพท์*</Form.Label>
                                <Form.Control type="text" name="phone" value={contactInfo.phone} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>FAX*</Form.Label>
                                <Form.Control type="text" name="fax" value={contactInfo.fax} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail*</Form.Label>
                        <Form.Control type="email" name="email" value={contactInfo.email} onChange={handleChange} required />
                    </Form.Group>

                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Facebook*</Form.Label><Form.Control type="text" name="facebookName" value={contactInfo.facebookName} onChange={handleChange} required /></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Link Facebook*</Form.Label><Form.Control type="url" name="facebookUrl" value={contactInfo.facebookUrl} onChange={handleChange} required /></Form.Group></Col>
                    </Row>

                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Line-ID*</Form.Label><Form.Control type="text" name="lineId" value={contactInfo.lineId} onChange={handleChange} required /></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Link Line-ID*</Form.Label><Form.Control type="url" name="lineUrl" value={contactInfo.lineUrl} onChange={handleChange} required /></Form.Group></Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Link Google map*</Form.Label>
                        <Form.Control as="textarea" rows={3} name="googleMapUrl" value={contactInfo.googleMapUrl} onChange={handleChange} required placeholder="วางโค้ด embed จาก Google Maps ที่นี่" />
                    </Form.Group>

                    <div className="map-preview-container">
                        <h5 className="mb-3">ตัวอย่างการแสดง Google Map</h5>
                        {contactInfo.googleMapUrl ? (
                             <iframe
                                src={contactInfo.googleMapUrl}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map Preview"
                            ></iframe>
                        ) : (
                            <div className="text-center text-muted p-5">โปรดวาง URL ของ Google Map ในช่องด้านบนเพื่อดูตัวอย่าง</div>
                        )}
                    </div>
                    
                    <div className="form-actions">
                        <Button variant="secondary" type="button">ยกเลิก</Button>
                        <Button variant="primary" type="submit">บันทึก</Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default ManageContactPage;