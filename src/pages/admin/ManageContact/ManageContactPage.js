import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { mockContactData } from '../../../data/mock-contact-info';
import './ManageContact.css';

const facebookUrlRegex = /^https:\/\/(www\.)?facebook\.com\/.+/;
const lineUrlRegex = /^https:\/\/line\.me\/ti\/p\/~.+/;
const googleMapUrlRegex = /^https:\/\/(www\.)?google\.com\/maps\/embed\?pb=.+/;


const ManageContactPage = () => {
    const [contactInfo, setContactInfo] = useState(mockContactData);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (name === 'phone' || name === 'fax') {
            const numericValue = value.replace(/\D/g, '');
            setContactInfo(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setContactInfo(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        const requiredFields = ['address', 'phone', 'email', 'facebookName', 'facebookUrl', 'lineId', 'lineUrl', 'googleMapUrl'];
        requiredFields.forEach(field => {
            if (!contactInfo[field]?.trim()) {
                newErrors[field] = 'กรุณากรอกข้อมูล';
            }
        });

        // --- ตรวจสอบเงื่อนไขพิเศษ ---

        
        if (contactInfo.facebookUrl && !facebookUrlRegex.test(contactInfo.facebookUrl)) {
            newErrors.facebookUrl = 'รูปแบบ Link Facebook ไม่ถูกต้อง (ตัวอย่าง: https://www.facebook.com/username)';
        }

        if (contactInfo.lineUrl && !lineUrlRegex.test(contactInfo.lineUrl)) {
            newErrors.lineUrl = 'รูปแบบ Link Line ไม่ถูกต้อง (ตัวอย่าง: https://line.me/ti/p/~username)';
        }

        if (contactInfo.googleMapUrl && !googleMapUrlRegex.test(contactInfo.googleMapUrl)) {
            newErrors.googleMapUrl = 'รูปแบบ Link Google Maps Embed ไม่ถูกต้อง';
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Updated Contact Info:', contactInfo);
            alert('บันทึกข้อมูลการติดต่อสำเร็จ!');
        }
    };

    return (
        <Container fluid className="manage-contact-page">
            <h2 className="page-title">จัดการข้อมูลติดต่อ</h2>

            <div className="form-container">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ที่ตั้งสมาคม*</Form.Label>
                        <Form.Control as="textarea" rows={3} name="address" value={contactInfo.address} onChange={handleChange} required isInvalid={!!formErrors.address} />
                        <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>โทรศัพท์*</Form.Label>
                                <Form.Control type="tel" name="phone" value={contactInfo.phone} onChange={handleChange} required isInvalid={!!formErrors.phone} />
                                <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>FAX</Form.Label>
                                <Form.Control type="tel" name="fax" value={contactInfo.fax} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail*</Form.Label>
                        <Form.Control type="email" name="email" value={contactInfo.email} onChange={handleChange} required isInvalid={!!formErrors.email} />
                        <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Facebook*</Form.Label>
                                <Form.Control type="text" name="facebookName" value={contactInfo.facebookName} onChange={handleChange} required isInvalid={!!formErrors.facebookName} />
                                <Form.Control.Feedback type="invalid">{formErrors.facebookName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Link Facebook*</Form.Label>
                                <Form.Control type="url" name="facebookUrl" value={contactInfo.facebookUrl} onChange={handleChange} required isInvalid={!!formErrors.facebookUrl} placeholder="https://www.facebook.com/username" />
                                <Form.Control.Feedback type="invalid">{formErrors.facebookUrl}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Line-ID*</Form.Label>
                                <Form.Control type="text" name="lineId" value={contactInfo.lineId} onChange={handleChange} required isInvalid={!!formErrors.lineId} />
                                <Form.Control.Feedback type="invalid">{formErrors.lineId}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Link Line-ID*</Form.Label>
                                <Form.Control type="url" name="lineUrl" value={contactInfo.lineUrl} onChange={handleChange} required isInvalid={!!formErrors.lineUrl} placeholder="https://line.me/ti/p/~yourid" />
                                <Form.Control.Feedback type="invalid">{formErrors.lineUrl}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Link Google map* (Embed URL)</Form.Label>
                        <Form.Control as="textarea" rows={3} name="googleMapUrl" value={contactInfo.googleMapUrl} onChange={handleChange} required placeholder="วาง URL จากช่อง src ของ iframe ที่ได้จาก Google Maps Embed" isInvalid={!!formErrors.googleMapUrl} />
                        <Form.Control.Feedback type="invalid">{formErrors.googleMapUrl}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="map-preview-container">
                        <h5 className="mb-3">ตัวอย่างการแสดง Google Map</h5>
                        {contactInfo.googleMapUrl && !formErrors.googleMapUrl ? (
                             <iframe src={contactInfo.googleMapUrl} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map Preview"></iframe>
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