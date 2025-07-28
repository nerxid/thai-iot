import React, { useState, useEffect } from 'react';
import { Container, Nav, Form, Button, Row, Col, Image, Card, Alert } from 'react-bootstrap';
import { Plus, X, TrashFill } from 'react-bootstrap-icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockAboutContent } from '../../../data/mock-about-content';
import './ManageAbout.css';

const SortableAboutImage = ({ item, index, onRemove, onImageChange }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.preview });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab' };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="thumbnail-item">
            <Form.Label htmlFor={`about-image-update-${index}`} className="mb-0">
                <Image src={item.preview} thumbnail />
            </Form.Label>
            <Form.Control 
                id={`about-image-update-${index}`}
                type="file"
                hidden
                accept=".jpg,.png,.jpeg"
                onChange={(e) => onImageChange(e, index)}
            />
            <Button 
                variant="danger" 
                size="sm" 
                className="thumbnail-delete-btn" 
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                }}
            >
                <X size={16} />
            </Button>
        </div>
    );
};


const ManageAboutPage = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [aboutData, setAboutData] = useState(mockAboutContent.about);
    const [aboutImages, setAboutImages] = useState([]);
    const [visionData, setVisionData] = useState(mockAboutContent.vision);
    const [visionImage, setVisionImage] = useState({ file: null, preview: mockAboutContent.vision.imageUrl });
    const [missionsData, setMissionsData] = useState(mockAboutContent.missions);
    const [fileErrors, setFileErrors] = useState({});

    useEffect(() => {
        setAboutImages(mockAboutContent.about.imageUrls.map(url => ({ file: null, preview: url })));
    }, []);
    
    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!file) return 'ไม่มีไฟล์';
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };

    const handleImageChange = (e, section, index = null) => {
        const file = e.target.files[0];
        const errorKey = section.startsWith('about') ? 'about' : section === 'missions' ? `mission-${index}` : section;
        setFileErrors(prev => ({...prev, [errorKey]: null}));
        if (!file) return;
        const error = validateFile(file);
        if (error) {
            setFileErrors(prev => ({...prev, [errorKey]: error}));
            e.target.value = null;
            return;
        }
        const newImage = { file, preview: URL.createObjectURL(file) };
        if (section === 'about-add') {
            setAboutImages(prev => [...prev, newImage].slice(0, 4));
        } else if (section === 'about-update') {
            setAboutImages(prev => {
                const updated = [...prev];
                updated[index] = newImage;
                return updated;
            });
        } else if (section === 'vision') {
            setVisionImage(newImage);
        } else if (section === 'missions') {
            const updatedMissions = [...missionsData];
            updatedMissions[index].imageUrl = newImage.preview;
            updatedMissions[index].file = newImage.file;
            setMissionsData(updatedMissions);
        }
        e.target.value = null;
    };

    const handleFormSubmit = (e, section) => {
        e.preventDefault();
        if (section === 'เกี่ยวกับสมาคม' && aboutImages.length !== 4) {
            alert('กรุณาอัปโหลดรูปภาพในส่วน "เกี่ยวกับสมาคม" ให้ครบ 4 รูป');
            return;
        }
        alert(`บันทึกข้อมูลส่วน "${section}" เรียบร้อย!`);
    };

    const removeAboutImage = (indexToRemove) => {
        if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            setAboutImages(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    const handleAboutDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setAboutImages((items) => {
                const oldIndex = items.findIndex(item => item.preview === active.id);
                const newIndex = items.findIndex(item => item.preview === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    
    const handleMissionChange = (index, field, value) => {
        const updatedMissions = [...missionsData];
        updatedMissions[index][field] = value;
        setMissionsData(updatedMissions);
    };
    
    const renderAboutForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'เกี่ยวกับสมาคม')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (ต้องมี 4 รูป, คลิกเพื่อเปลี่ยน, ลากเพื่อสลับตำแหน่ง)</Form.Label>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleAboutDragEnd}>
                    <SortableContext items={aboutImages.map(img => img.preview)} strategy={horizontalListSortingStrategy}>
                        <div className="thumbnail-container">
                            {aboutImages.map((img, index) => (
                                <SortableAboutImage 
                                    key={img.preview} 
                                    item={img} 
                                    index={index} 
                                    onRemove={removeAboutImage}
                                    onImageChange={(e) => handleImageChange(e, 'about-update', index)}
                                />
                            ))}
                            {aboutImages.length < 4 && (
                                <Form.Label htmlFor="about-image-add" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                            )}
                            <Form.Control id="about-image-add" type="file" onChange={(e) => handleImageChange(e, 'about-add')} hidden accept=".jpg,.png,.jpeg" />
                        </div>
                    </SortableContext>
                </DndContext>
                {fileErrors.about && <Alert variant="danger" className="mt-2 small-alert">{fileErrors.about}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={aboutData.title} onChange={(e) => setAboutData({...aboutData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={5} value={aboutData.description} onChange={(e) => setAboutData({...aboutData, description: e.target.value})} required /></Form.Group>
            
            <div className="form-actions-wrapper">
                {aboutImages.length !== 4 && (
                    <Alert variant="warning" className="text-center">
                        กรุณาอัปโหลดรูปภาพให้ครบ 4 รูปเพื่อเปิดใช้งานปุ่มบันทึก
                    </Alert>
                )}
                <div className="form-actions">
                    <Button variant="primary" type="submit" disabled={aboutImages.length !== 4}>
                        บันทึก
                    </Button>
                </div>
            </div>
        </Form>
    );

    const renderVisionForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'วิสัยทัศน์')}>
            <Form.Group className="mb-4">
                <Form.Label>อัปโหลดรูปภาพ (ใช้รูปภาพ 1 รูป)</Form.Label>
                <Form.Label htmlFor="vision-upload" className="upload-box-square upload-box-large">
                    {visionImage.preview ? <Image src={visionImage.preview} /> : <Plus size={40} />}
                </Form.Label>
                <Form.Control id="vision-upload" type="file" onChange={(e) => handleImageChange(e, 'vision')} hidden accept=".jpg,.png,.jpeg" />
                {fileErrors.vision && <Alert variant="danger" className="mt-2 small-alert">{fileErrors.vision}</Alert>}
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>หัวข้อ*</Form.Label><Form.Control type="text" value={visionData.title} onChange={(e) => setVisionData({...visionData, title: e.target.value})} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>คำอธิบาย*</Form.Label><Form.Control as="textarea" rows={3} value={visionData.description} onChange={(e) => setVisionData({...visionData, description: e.target.value})} required /></Form.Group>
            <div className="form-actions"><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    const renderMissionsForm = () => (
        <Form onSubmit={(e) => handleFormSubmit(e, 'พันธกิจ')}>
            <Row>
                {missionsData.map((mission, index) => (
                    <Col md={6} key={index} className="mb-3">
                        <Card className="mission-card h-100">
                            <Card.Body>
                                <Card.Title>พันธกิจหลักที่ {index + 1}</Card.Title>
                                <Form.Group className="mb-3">
                                    <Form.Label>รูปภาพ</Form.Label>
                                    <Form.Label htmlFor={`mission-upload-${index}`} className="upload-box-square w-100" style={{ height: '150px' }}>
                                        {mission.imageUrl ? <Image src={mission.imageUrl} style={{width:'100%', height:'100%', objectFit: 'cover'}} /> : <Plus size={30} />}
                                    </Form.Label>
                                    <Form.Control id={`mission-upload-${index}`} type="file" onChange={(e) => handleImageChange(e, 'missions', index)} hidden accept=".jpg,.png,.jpeg" />
                                    {fileErrors[`mission-${index}`] && <Alert variant="danger" className="mt-2 small-alert">{fileErrors[`mission-${index}`]}</Alert>}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>หัวข้อ*</Form.Label>
                                    <Form.Control type="text" value={mission.title} onChange={(e) => handleMissionChange(index, 'title', e.target.value)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>คำอธิบาย*</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={mission.description} onChange={(e) => handleMissionChange(index, 'description', e.target.value)} required />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="form-actions"><Button variant="primary" type="submit">บันทึก</Button></div>
        </Form>
    );

    return (
        <Container fluid className="manage-about-page">
            <div className="page-header"><h2 className="page-title">จัดการเนื้อหาสมาคม</h2></div>
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