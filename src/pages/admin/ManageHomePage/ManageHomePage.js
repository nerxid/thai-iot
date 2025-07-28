import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image, Col, Row, Carousel, Alert } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './ManageHomePage.css';

const SortablePosterItem = ({ item, index, onRemove, onSelect }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.preview });
    const style = { 
        transform: CSS.Transform.toString(transform), 
        transition,
        cursor: 'grab'
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className="thumbnail-item" 
            onClick={() => onSelect(index)}
        >
            <Image src={item.preview} thumbnail active={item.isActive} />
            
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


const ManageHomePage = () => {
    const [activeTab, setActiveTab] = useState('banners');
    const [bannerFile, setBannerFile] = useState({ file: null, preview: '' });
    const [introData, setIntroData] = useState({
        file: null, preview: '', title: 'เกี่ยวกับสมาคม',
        description: 'สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand...'
    });
    const [posterFiles, setPosterFiles] = useState([]);
    const [posterIndex, setPosterIndex] = useState(0);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (posterFiles.length > 0 && posterIndex >= posterFiles.length) {
            setPosterIndex(posterFiles.length - 1);
        } else if (posterFiles.length === 0) {
            setPosterIndex(0);
        }
    }, [posterFiles, posterIndex]);

    const MAX_FILE_SIZE = 1 * 1024 * 1024; 
    const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

    const validateFile = (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) return `ไฟล์ "${file.name}" เป็นประเภทที่ไม่ได้รับอนุญาต (ต้องเป็น .jpg, .png, หรือ .jpeg เท่านั้น)`;
        if (file.size > MAX_FILE_SIZE) return `ไฟล์ "${file.name}" มีขนาดใหญ่เกิน 1 MB`;
        return null;
    };

    const handleFileChange = (e, section) => {
        const file = e.target.files[0];
        setFormErrors(prev => ({ ...prev, [section]: null }));
        if (!file) return;
        const error = validateFile(file);
        if (error) {
            setFormErrors(prev => ({ ...prev, [section]: error }));
            e.target.value = null;
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        if (section === 'banner') setBannerFile({ file, preview: previewUrl });
        else if (section === 'intro') setIntroData(prev => ({ ...prev, file: file, preview: previewUrl }));
    };

    const handleMultipleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormErrors(prev => ({ ...prev, posters: null }));
        if (files.length === 0) return;
        const newFiles = [], errors = [];
        files.forEach(file => {
            const error = validateFile(file);
            if (error) errors.push(error);
            else newFiles.push({ file: file, preview: URL.createObjectURL(file) });
        });
        if (errors.length > 0) setFormErrors(prev => ({ ...prev, posters: errors.join('\n') }));
        if (newFiles.length > 0) setPosterFiles(prev => [...prev, ...newFiles].slice(0, 10));
        e.target.value = null;
    };
    
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setPosterFiles((items) => {
                const oldIndex = items.findIndex(item => item.preview === active.id);
                const newIndex = items.findIndex(item => item.preview === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handlePosterSelect = (selectedIndex) => setPosterIndex(selectedIndex);

    const removePosterImage = (indexToRemove) => {
        if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            setPosterFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    const handleIntroChange = (e) => {
        const { name, value } = e.target;
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
        setIntroData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = (section) => {
        const newErrors = {};
        if (section === 'intro') {
            if (!introData.preview && !introData.file) newErrors.intro = 'กรุณาอัปโหลดรูปภาพ';
            if (!introData.title.trim()) newErrors.title = 'กรุณากรอกหัวข้อ';
            if (!introData.description.trim()) newErrors.description = 'กรุณากรอกคำอธิบาย';
            setFormErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
                alert('กรุณากรอกข้อมูลในส่วน "แนะนำเพิ่มเติม" ให้ครบถ้วน');
                return;
            }
        }
        setFormErrors({});
        alert(`บันทึกข้อมูลส่วน ${section} เรียบร้อย!`);
    };

    const BannerTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (ใช้ 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</p>
            <Form.Group>
                <Form.Label htmlFor="banner-upload" className="upload-box-large">
                    {bannerFile.preview ? <Image src={bannerFile.preview} alt="Banner preview" fluid /> : <div className="upload-placeholder"><Plus size={50} /><span>อัปโหลดรูปภาพ</span></div>}
                </Form.Label>
                <Form.Control id="banner-upload" type="file" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, 'banner')} hidden />
                {formErrors.banner && <Alert variant="danger" className="mt-2">{formErrors.banner}</Alert>}
            </Form.Group>
        </div>
    );

    const IntroTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (ใช้ 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</p>
            <Row>
                <Col md={4} lg={3}>
                     <Form.Group>
                         <Form.Label htmlFor="intro-upload" className={`upload-box-square ${formErrors.intro ? 'is-invalid' : ''}`}>
                            {introData.preview ? <Image src={introData.preview} alt="Intro preview" fluid /> : <div className="upload-placeholder"><Plus size={40} /></div>}
                         </Form.Label>
                         <Form.Control id="intro-upload" type="file" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, 'intro')} hidden />
                         {formErrors.intro && <Alert variant="danger" className="mt-2 small-alert">{formErrors.intro}</Alert>}
                    </Form.Group>
                </Col>
                <Col md={8} lg={9}>
                    <Form.Group className="mb-3" controlId="formIntroTitle">
                        <Form.Label>หัวข้อ*</Form.Label>
                        <Form.Control type="text" name="title" value={introData.title} onChange={handleIntroChange} isInvalid={!!formErrors.title}/>
                        <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formIntroDescription">
                        <Form.Label>คำอธิบาย*</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description" value={introData.description} onChange={handleIntroChange} isInvalid={!!formErrors.description}/>
                        <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
    
    const PostersTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (สูงสุด 10 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB), สามารถลากเพื่อสลับตำแหน่งได้</p>
            <div className="poster-preview-main mb-3">
                {posterFiles.length > 0 ? (
                    <Carousel activeIndex={posterIndex} onSelect={handlePosterSelect} interval={null} variant="dark">
                        {posterFiles.map((item, index) => (
                            <Carousel.Item key={index}><Image src={item.preview} fluid /></Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="upload-placeholder-rect"><span>ตัวอย่างโปสเตอร์</span></div>
                )}
            </div>
            {formErrors.posters && <Alert variant="danger" className="mt-2">{formErrors.posters}</Alert>}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={posterFiles.map(item => item.preview)} strategy={horizontalListSortingStrategy}>
                    <div className="thumbnail-container">
                        {posterFiles.map((item, index) => (
                            <SortablePosterItem key={item.preview} item={{ ...item, isActive: index === posterIndex }} index={index} onRemove={removePosterImage} onSelect={handlePosterSelect}/>
                        ))}
                        {posterFiles.length < 10 && (
                            <Form.Group className="thumbnail-upload-wrapper">
                                <Form.Label htmlFor="poster-upload" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                                <Form.Control id="poster-upload" type="file" accept="image/jpeg, image/png" onChange={handleMultipleFileChange} multiple hidden />
                            </Form.Group>
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );

    return (
        <Container fluid className="manage-homepage-container p-0">
            <div className="content-wrapper p-3 p-md-4">
                <h2 className="mb-4">จัดการหน้าแรก</h2>
                <div className="custom-tabs-nav-container">
                    <div className="custom-tabs-nav">
                        <button className={`custom-tab-button ${activeTab === 'banners' ? 'active' : ''}`} onClick={() => setActiveTab('banners')}>แบนเนอร์</button>
                        <button className={`custom-tab-button ${activeTab === 'intro' ? 'active' : ''}`} onClick={() => setActiveTab('intro')}>แนะนำเพิ่มเติม</button>
                        <button className={`custom-tab-button ${activeTab === 'posters' ? 'active' : ''}`} onClick={() => setActiveTab('posters')}>บอร์ดประชาสัมพันธ์</button>
                    </div>
                </div>
                <div className="custom-tab-content">
                    <div style={{ display: activeTab === 'banners' ? 'block' : 'none' }}><BannerTab /></div>
                    <div style={{ display: activeTab === 'intro' ? 'block' : 'none' }}><IntroTab /></div>
                    <div style={{ display: activeTab === 'posters' ? 'block' : 'none' }}><PostersTab /></div>
                    <hr className="my-4" />
                    <div className="form-actions">
                        <Button variant="primary" onClick={() => handleSave(activeTab)}>บันทึก</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ManageHomePage;