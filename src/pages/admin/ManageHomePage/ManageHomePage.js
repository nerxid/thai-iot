import React, { useState } from 'react';
import { Container, Form, Button, Image, Col, Row, Carousel } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import './ManageHomePage.css';

const ManageHomePage = () => {
    const [activeTab, setActiveTab] = useState('banners');

    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState('');
    const [introData, setIntroData] = useState({
        file: null,
        preview: '',
        title: 'เกี่ยวกับสมาคม',
        description: 'สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand...'
    });
    const [posterFiles, setPosterFiles] = useState([]);
    const [posterIndex, setPosterIndex] = useState(0);

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

    const handlePosterSelect = (selectedIndex, e) => {
        setPosterIndex(selectedIndex);
    };

    const handleFileChange = (e, section) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            alert(`ขนาดไฟล์ต้องไม่เกิน 1 MB`);
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        if (section === 'banner') {
            setBannerFile(file);
            setBannerPreview(previewUrl);
        } else if (section === 'intro') {
            setIntroData(prev => ({ ...prev, file: file, preview: previewUrl }));
        }
    };

    const handleMultipleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`ไฟล์ "${file.name}" มีขนาดใหญ่เกิน 1 MB และจะไม่ถูกเพิ่ม`);
                return false;
            }
            return true;
        });
        
        if(validFiles.length === 0) return;

        const newFiles = validFiles.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));

        setPosterFiles(prev => [...prev, ...newFiles].slice(0, 10));
    };

    const removePosterImage = (indexToRemove) => {
        setPosterFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        if (posterIndex >= posterFiles.length - 1) {
            setPosterIndex(0);
        }
    };

    const handleIntroChange = (e) => {
        const { name, value } = e.target;
        setIntroData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (section) => {
        console.log(`Saving data for section: ${section}`);
        alert(`บันทึกข้อมูลส่วน ${section} เรียบร้อย!`);
    };

    const BannerTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (ใช้รูปภาพทั้งหมด 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</p>
            <Form.Group>
                <Form.Label htmlFor="banner-upload" className="upload-box-large">
                    {bannerPreview ? (
                        <Image src={bannerPreview} alt="Banner preview" fluid />
                    ) : (
                        <div className="upload-placeholder">
                            <Plus size={50} />
                            <span>อัปโหลดรูปภาพ</span>
                        </div>
                    )}
                </Form.Label>
                <Form.Control id="banner-upload" type="file" accept=".jpg, .png, .jpeg" onChange={(e) => handleFileChange(e, 'banner')} hidden />
            </Form.Group>
        </div>
    );

    const IntroTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (ใช้รูปภาพทั้งหมด 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</p>
            <Row>
                <Col md={4} lg={3}>
                    <Form.Group>
                        <Form.Label htmlFor="intro-upload" className="upload-box-square">
                            {introData.preview ? (
                                <Image src={introData.preview} alt="Intro preview" fluid />
                            ) : (
                                <div className="upload-placeholder">
                                    <Plus size={40} />
                                </div>
                            )}
                        </Form.Label>
                        <Form.Control id="intro-upload" type="file" accept=".jpg, .png, .jpeg" onChange={(e) => handleFileChange(e, 'intro')} hidden />
                    </Form.Group>
                </Col>
                <Col md={8} lg={9}>
                    <Form.Group className="mb-3" controlId="formIntroTitle">
                        <Form.Label>หัวข้อ*</Form.Label>
                        <Form.Control type="text" name="title" value={introData.title} onChange={handleIntroChange} />
                    </Form.Group>
                    <Form.Group controlId="formIntroDescription">
                        <Form.Label>คำอธิบาย*</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description" value={introData.description} onChange={handleIntroChange} />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    const PostersTab = () => (
        <div>
            <p className="text-muted mb-3">อัปโหลดรูปภาพ (ใช้รูปภาพสูงสุด 10 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB)</p>
            <div className="poster-preview-main mb-3">
                {posterFiles.length > 0 ? (
                    <Carousel
                        activeIndex={posterIndex}
                        onSelect={handlePosterSelect}
                        interval={null}
                        variant="dark"
                    >
                        {posterFiles.map((item, index) => (
                            <Carousel.Item key={index}>
                                <Image src={item.preview} fluid />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="upload-placeholder-rect">
                        <span>ตัวอย่างโปสเตอร์</span>
                    </div>
                )}
            </div>
            <div className="thumbnail-container">
                {posterFiles.map((item, index) => (
                    <div key={index} className="thumbnail-item" onClick={() => setPosterIndex(index)}>
                        <Image src={item.preview} thumbnail active={index === posterIndex} />
                        <Button variant="danger" size="sm" className="thumbnail-delete-btn" onClick={(e) => { e.stopPropagation(); removePosterImage(index); }}>
                            <X size={16} />
                        </Button>
                    </div>
                ))}
                {posterFiles.length < 10 && (
                    <Form.Group>
                        <Form.Label htmlFor="poster-upload" className="thumbnail-upload-box">
                            <Plus size={24} />
                        </Form.Label>
                        <Form.Control id="poster-upload" type="file" accept=".jpg, .png, .jpeg" onChange={handleMultipleFileChange} multiple hidden />
                    </Form.Group>
                )}
            </div>
        </div>
    );

    const renderActiveTabContent = () => {
        switch(activeTab) {
            case 'banners': return <BannerTab />;
            case 'intro':   return <IntroTab />;
            case 'posters': return <PostersTab />;
            default:        return null;
        }
    };

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
                    {renderActiveTabContent()}
                    <hr className="my-4" />
                    <div className="form-actions">
                        <Button variant="secondary">ยกเลิก</Button>
                        <Button variant="primary" onClick={() => handleSave(activeTab)}>บันทึก</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ManageHomePage;