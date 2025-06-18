import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GeoAltFill, TelephoneFill, EnvelopeFill, Facebook, Line } from 'react-bootstrap-icons';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prevData => ({ ...prevData, [name]: numericValue.slice(0, 10) }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert('ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด');
        setFormData({
            firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''
        });
    };

    const styles = {
        pageWrapper: {
            paddingBottom: '80px',
        },
        pageHeader: {
            backgroundColor: '#EFF6FF',
            padding: '80px 0',
            textAlign: 'center',
            marginBottom: '60px',
        },
        headerTitle: {
            fontWeight: 'bold', fontSize: '3.5rem', color: '#1e3a8a',
        },
        contactInfoCard: {
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            marginBottom: '30px'
        },
        contactItem: {
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '20px',
            fontSize: '1.1rem',
            lineHeight: '1.6' 
        },
        contactIcon: {
            marginRight: '15px',
            color: '#3B82F6',
            fontSize: '1.5rem',
            marginTop: '5px'
        },
        link: { 
            color: '#1F2937',
            fontWeight: '600',
            textDecoration: 'underline',
            textDecorationColor: '#3B82F6',
            textDecorationThickness: '2px',
        },
        mapContainer: {
            borderRadius: '20px',
            overflow: 'hidden',
            height: '400px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        },
        formCard: {
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        }
    };
    
    const contactDetails = [
        { icon: <GeoAltFill style={styles.contactIcon} />, content: "ที่ทำการ: สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (DEPA) ถนนลาดพร้าว ซอยลาดพร้าว 10 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900" },
        { icon: <TelephoneFill style={styles.contactIcon} />, content: "โทรศัพท์: 02-516-1594-5\nFAX: 02-516-1596" },
        { icon: <EnvelopeFill style={styles.contactIcon} />, content: "E-Mail: manager@thaiiot.org" },
        { 
            icon: <Facebook style={styles.contactIcon} />, 
            content: (
                <span>
                    Facebook: <a href="https://www.facebook.com/profile.php?id=100070861150788" target="_blank" rel="noopener noreferrer" style={styles.link}>Thai IoT Association</a>
                </span>
            )
        },
        { 
            icon: <Line style={styles.contactIcon} />, 
            content: (
                <span>
                    Line: <a href="https://line.me/R/ti/p/@763bzrjr" target="_blank" rel="noopener noreferrer" style={styles.link}>@763bzrjr</a>
                </span>
            )
        },
    ];

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.pageHeader}>
                <Container>
                    <h1 style={styles.headerTitle}>ติดต่อเรา</h1>
                    
                </Container>
            </div>

            <Container>
                <Row className="g-5">
                    <Col lg={6}>
                        <div style={styles.contactInfoCard}>
                            <h3 className="fw-bold mb-4">ข้อมูลการติดต่อ</h3>
                            {contactDetails.map((item, index) => (
                                <div key={index} style={styles.contactItem}>
                                    {item.icon}
                                    <div style={{ whiteSpace: 'pre-line' }}>{item.content}</div>
                                </div>
                            ))}
                        </div>
                        <div style={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.497742731675!2d100.56337157509127!3d13.809123786588744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283255d67eaf7%3A0xe1c64aa0a0229427!2z4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4Liq4LmI4LiH4LmA4Liq4Lij4Li04Lih4LmA4Lio4Lij4Lip4LiQ4LiB4Li04LiI4LiU4Li04LiI4Li04LiX4Lix4LilICjguKrguLPguJnguLHguIHguIfguLLguJnguYPguKvguI3guYgp!5e0!3m2!1sth!2sth!4v1750134711463!5m2!1sth!2sth"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Thai IoT Association Location"
                            ></iframe>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div style={styles.formCard}>
                            <h3 className="fw-bold mb-4">ส่งข้อความถึงเรา</h3>
                            <Form onSubmit={handleSubmit}>
                                
                                 <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formFirstName">
                                            <Form.Label>ชื่อ*</Form.Label>
                                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label>นามสกุล*</Form.Label>
                                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>อีเมล*</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>เบอร์โทร</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange}
                                        pattern="[0-9]{10}"
                                        title="กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>หัวข้อ*</Form.Label>
                                    <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>ข้อความ*</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                                    ส่งข้อความ
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContactPage;