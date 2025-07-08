import React, { useState, useEffect } from 'react';
import { Container, Nav, Form, Button, Row, Col, Image, Card, Alert } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import { mockAboutContent } from '../../../data/mock-about-content';
import './ManageAbout.css';

const ManageAboutPage = () => {
    const [activeTab, setActiveTab] = useState('about');
    
    // State for "About" 
    const [aboutData, setAboutData] = useState(mockAboutContent.about);
    const [aboutImages, setAboutImages] = useState([]);

    // State for "Vision"
    const [visionData, setVisionData] = useState(mockAboutContent.vision);
    const [visionImage, setVisionImage] = useState({ file: null, preview: ''});

    // State for "Missions"
    const [missionsData, setMissionsData] = useState(mockAboutContent.missions);
    const [missionImages, setMissionImages] = useState([]);

    useEffect(() => {
        if (visionData && visionData.imageUrl) {
            setVisionImage({ file: null, preview: visionData.imageUrl });
        }
        if (aboutData && aboutData.imageUrls && Array.isArray(aboutData.imageUrls)) {
            setAboutImages(aboutData.imageUrls.map(url => ({ file: null, preview: url })));
        }
        if (missionsData && Array.isArray(missionsData)) {
            setMissionImages(missionsData.map(mission => ({ file: null, preview: mission.imageUrl })));
        }
    }, []);

    const handleFormSubmit = (e, section) => {
        e.preventDefault();
        alert(`บันทึกข้อมูลส่วน "${section}" เรียบร้อย!`);
        console.log(`Data for ${section}:`, 
            section === 'เกี่ยวกับสมาคม' ? { ...aboutData, images: aboutImages } :
            section === 'วิสัยทัศน์' ? { ...visionData, image: visionImage } :
            { missions: missionsData, images: missionImages }
        );
    };

    const handleImageChange = (e, setter, isMultiple = false, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
            alert('ขนาดไฟล์ต้องไม่เกิน 1 MB');
            return;
        }

        const newImage = { file, preview: URL.createObjectURL(file) };

        if (isMultiple) {
            if (index !== null) {
                setter(prev => {
                    const updated = [...prev];
                    updated[index] = newImage;
                    return updated;
                });
            } else { 
                 setter(prev => [...prev, newImage].slice(0, 4));
            }
        } else {
            setter(newImage);
        }
        e.target.value = null;
    };
    
    const renderAboutForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'เกี่ยวกับสมาคม')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (คลิกที่รูปเพื่อเปลี่ยน หรือกด + เพื่อเพิ่ม)</Form.Label>
                <div className="thumbnail-container">
                    {aboutImages.map((img, index) => (
                        <div key={index} className="thumbnail-item">
                            <Form.Label htmlFor={`about-image-update-${index}`} className="mb-0">
                                <Image src={img.preview} thumbnail />
                            </Form.Label>
                            <Form.Control 
                                id={`about-image-update-${index}`}
                                type="file"
                                hidden
                                accept=".jpg,.png,.jpeg"
                                onChange={(e) => handleImageChange(e, setAboutImages, true, index)}
                            />
                        </div>
                    ))}
                    
                    {aboutImages.length < 4 && (
                        <Form.Label htmlFor="about-image-add" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                    )}
                    <Form.Control id="about-image-add" type="file" onChange={(e) => handleImageChange(e, setAboutImages, true)} hidden multiple={false} accept=".jpg,.png,.jpeg" />
                </div>
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={aboutData.title} onChange={(e) => setAboutData({...aboutData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={5} value={aboutData.description} onChange={(e) => setAboutData({...aboutData, description: e.target.value})} required /></Form.Group>
            <div className="form-actions"><Button variant="secondary">ยกเลิก</Button><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    const renderVisionForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'วิสัยทัศน์')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (ใช้รูปภาพ 1 รูป)</Form.Label>
                <Form.Label htmlFor="vision-upload" className="upload-box-square upload-box-large">
                    {visionImage.preview ? <Image src={visionImage.preview} /> : <Plus size={40} />}
                </Form.Label>
                <Form.Control id="vision-upload" type="file" onChange={(e) => handleImageChange(e, setVisionImage)} hidden accept=".jpg,.png,.jpeg" />
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={visionData.title} onChange={(e) => setVisionData({...visionData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={3} value={visionData.description} onChange={(e) => setVisionData({...visionData, description: e.target.value})} required /></Form.Group>
            <div className="form-actions"><Button variant="secondary">ยกเลิก</Button><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    const renderMissionsForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'พันธกิจ')}>
             <Row>
                {missionsData.map((mission, index) => (
                    <Col md={6} key={index}>
                        <Card className="mission-card">
                            <Card.Body>
                                <Card.Title>พันธกิจหลักที่ {index + 1}</Card.Title>
                                <Form.Group className="mb-3">
                                    <Form.Label>รูปภาพ</Form.Label>
                                    <Form.Label htmlFor={`mission-upload-${index}`} className="upload-box-square w-100" style={{ height: '150px' }}>
                                        {missionImages[index]?.preview ? <Image src={missionImages[index].preview} style={{width:'100%', height:'100%', objectFit: 'cover'}} /> : <Plus size={30} />}
                                    </Form.Label>
                                    <Form.Control id={`mission-upload-${index}`} type="file" onChange={(e) => handleImageChange(e, setMissionImages, true, index)} hidden />
                                </Form.Group>
                                <Form.Group className="mb-2"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={mission.title} required /></Form.Group>
                                <Form.Group><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={3} value={mission.description} required /></Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="form-actions"><Button variant="secondary">ยกเลิก</Button><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    return (
        <Container fluid className="manage-about-page">
            <div className="page-header">
                <h2 className="page-title">จัดการเนื้อหาสมาคม</h2>
            </div>
            
            <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item><Nav.Link eventKey="about">เกี่ยวกับสมาคม</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="vision">วิสัยทัศน์</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="missions">พันธกิจหลัก 4 ด้าน</Nav.Link></Nav.Item>
            </Nav>
            
            <div className="form-container">
                {activeTab === 'about' && renderAboutForm()}
                {activeTab === 'vision' && renderVisionForm()}
                {activeTab === 'missions' && renderMissionsForm()}
            </div>
        </Container>
    );
};

export default ManageAboutPage;