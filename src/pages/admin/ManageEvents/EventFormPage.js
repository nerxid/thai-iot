import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import TiptapEditor from '../../../components/admin/from/TiptapEditor';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'C:/inturn/new_thaiiot-1/src/pages/admin/ManageNews/ManageNewsAndEvents.css'
import { rawEventsData } from '../../../data/mock-events';

const EventFormPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(eventId);

    // State สำหรับเก็บข้อมูลในฟอร์ม
    const [eventType, setEventType] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [publishStatus, setPublishStatus] = useState('เผยแพร่');
    const [showOnCalendar, setShowOnCalendar] = useState('แสดง');
    const [scheduledAt, setScheduledAt] = useState(new Date());

    // State สำหรับรูปภาพ
    const [coverImage, setCoverImage] = useState({ file: null, preview: '' });
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [coverImageError, setCoverImageError] = useState('');
    const [secondaryImagesError, setSecondaryImagesError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const event = rawEventsData.find(item => item.id.toString() === eventId);
            if (event) {
                setTitle(event.title);
                setDetails(event.details || event.content);
                setPublishStatus(event.publishStatus || 'เผยแพร่');
                setCoverImage({ file: null, preview: event.imageUrl });
                setStartDate(new Date(event.start));
                setEndDate(new Date(event.end));
                setEventType(event.type || 'อบรม/สัมมนา'); 
            }
        }
    }, [eventId, isEditMode]);
    
    // --- ฟังก์ชันจัดการรูปภาพ ---
    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
        
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `ประเภทไฟล์ไม่ถูกต้อง (อนุญาตเฉพาะ .jpg, .png, .jpeg)`;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB} MB`;
        }
        return null; 
    };

    const handleCoverImageChange = (e) => {
        setCoverImageError(''); 
        const file = e.target.files[0];

        if (file) {
            const error = validateFile(file);
            if (error) {
                setCoverImageError(error);
                e.target.value = null; 
                return;
            }
            setCoverImage({ file, preview: URL.createObjectURL(file) });
        }
    };

    const handleSecondaryImagesChange = (e) => {
        setSecondaryImagesError('');
        const files = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                if (!errors.includes(error)) { errors.push(error); }
            } else {
                validFiles.push({ file, preview: URL.createObjectURL(file) });
            }
        });

        if (errors.length > 0) {
            setSecondaryImagesError(`พบปัญหา: ${errors.join(', ')}`);
        }
        
        setSecondaryImages(prev => [...prev, ...validFiles].slice(0, 5));
        e.target.value = null; 
    };
    
    const removeSecondaryImage = (indexToRemove) => {
        setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleNextStep = (e) => {
        e.preventDefault();
        if (!coverImage.preview) {
            setCoverImageError('กรุณาอัปโหลดรูปภาพหน้าปก');
            return;
        }

        const step1Data = { 
            eventType, title, details, startDate, endDate, 
            publishStatus, showOnCalendar, scheduledAt, 
            coverImage, secondaryImages 
        };
        
        navigate('/admin/manage-events/add/step2', { state: { step1Data: step1Data } });
    };

    return (
        <Container fluid className="manage-news-page p-0">
            <div className="content-wrapper p-3 p-md-4">
        <Container fluid className="manage-events-page">
            <div className="page-header">
                <h2 className="page-title">{isEditMode ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรม'}</h2>
                <p className="text-muted">ขั้นตอนที่ 1 จาก 2: ข้อมูลกิจกรรม</p>
            </div>

            <Form onSubmit={handleNextStep} className="data-form">
                <Form.Group className="mb-4">
                    <Form.Label>โปรดเลือกประเภทกิจกรรม*</Form.Label>
                    <Form.Select className="custom-form-select" value={eventType} onChange={e => setEventType(e.target.value)} required>
                        <option value="">-- เลือกประเภท --</option>
                        <option value="อบรม/สัมมนา">ทั่วไป</option>
                        <option value="ออกบูธ">ออกบูธ</option>
                       
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>อัปโหลดรูปภาพหน้าปก*</Form.Label>
                    <p className="form-text">ใช้รูปภาพทั้งหมด 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                    <Form.Label htmlFor="cover-upload" className="upload-box-square">
                        {coverImage.preview ? <Image src={coverImage.preview} fluid /> : <Plus size={40} />}
                    </Form.Label>
                    <Form.Control id="cover-upload" type="file" onChange={handleCoverImageChange} hidden accept=".jpg,.png,.jpeg" />
                    {coverImageError && <Alert variant="danger" className="mt-2">{coverImageError}</Alert>}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>อัปโหลดรูปภาพรอง</Form.Label>
                    <p className="form-text">ใช้รูปภาพได้สูงสุด 5 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                    <div className="thumbnail-container">
                        {secondaryImages.map((img, index) => (
                            <div key={index} className="thumbnail-item">
                                <Image src={img.preview} thumbnail />
                                <Button variant="danger" size="sm" className="thumbnail-delete-btn" onClick={() => removeSecondaryImage(index)}><X size={16} /></Button>
                            </div>
                        ))}
                        {secondaryImages.length < 5 && (
                            <Form.Label htmlFor="secondary-upload" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>
                        )}
                        <Form.Control id="secondary-upload" type="file" onChange={handleSecondaryImagesChange} multiple hidden accept=".jpg,.png,.jpeg" />
                    </div>
                    {secondaryImagesError && <Alert variant="danger" className="mt-2">{secondaryImagesError}</Alert>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>หัวข้อกิจกรรม*</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>รายละเอียด*</Form.Label>
                    <TiptapEditor content={details} setContent={setDetails} />
                </Form.Group>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>วันที่เริ่มกิจกรรม*</Form.Label>
                            <div><DatePicker selected={startDate} onChange={date => setStartDate(date)} className="form-control" /></div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>วันที่สิ้นสุดกิจกรรม*</Form.Label>
                            <div><DatePicker selected={endDate} onChange={date => setEndDate(date)} className="form-control" /></div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>สถานะการเผยแพร่*</Form.Label>
                            <div>
                                <Form.Check inline label="เผยแพร่" name="publishStatus" type="radio" value="เผยแพร่" checked={publishStatus === 'เผยแพร่'} onChange={(e) => setPublishStatus(e.target.value)} />
                                <Form.Check inline label="แบบร่าง" name="publishStatus" type="radio" value="แบบร่าง" checked={publishStatus === 'แบบร่าง'} onChange={(e) => setPublishStatus(e.target.value)} />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>ตั้งเวลาเผยแพร่</Form.Label>
                            <div><DatePicker selected={scheduledAt} onChange={date => setScheduledAt(date)} showTimeSelect dateFormat="Pp" className="form-control" /></div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>สถานะการแสดงบนปฏิทิน*</Form.Label>
                            <div>
                                <Form.Check inline label="แสดง" name="showOnCalendar" type="radio" value="แสดง" checked={showOnCalendar === 'แสดง'} onChange={(e) => setShowOnCalendar(e.target.value)} />
                                <Form.Check inline label="ไม่แสดง" name="showOnCalendar" type="radio" value="ไม่แสดง" checked={showOnCalendar === 'ไม่แสดง'} onChange={(e) => setShowOnCalendar(e.target.value)} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="form-actions">
                    <Button variant="secondary" type="button" onClick={() => navigate('/admin/manage-events')}>ยกเลิก</Button>
                    <Button variant="primary" type="submit">ถัดไป</Button>
                </div>
            </Form>
        </Container>
        </div>
        </Container>
    );
};

export default EventFormPage;