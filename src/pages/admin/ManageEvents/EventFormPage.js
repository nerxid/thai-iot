import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TiptapEditor from '../../../components/admin/from/TiptapEditor';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../ManageNews/ManageNewsAndEvents.css';
import { rawEventsData } from '../../../data/mock-events';

const SortableSecondaryImage = ({ image, index, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.preview });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab' };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="thumbnail-item">
            <Image src={image.preview} thumbnail />
            <Button variant="danger" size="sm" className="thumbnail-delete-btn" onPointerDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onRemove(index); }}>
                <X size={16} />
            </Button>
        </div>
    );
};

const EventFormPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(eventId);

    const [eventType, setEventType] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [publishStatus, setPublishStatus] = useState('เผยแพร่');
    const [showOnCalendar, setShowOnCalendar] = useState('แสดง');
    const [scheduledAt, setScheduledAt] = useState(new Date());
    const [coverImage, setCoverImage] = useState({ file: null, preview: '' });
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            const event = rawEventsData.find(item => item.id.toString() === eventId);
            if (event) {
                setEventType(event.type || 'อบรม/สัมมนา');
                setTitle(event.title);
                setDetails(event.details || event.content);
                setStartDate(new Date(event.start));
                setEndDate(new Date(event.end));
                setPublishStatus(event.publishStatus || 'เผยแพร่');
                setCoverImage({ file: null, preview: event.imageUrl });
                setSecondaryImages(event.secondaryImages?.map(url => ({ file: null, preview: url })) || []);
            }
        }
    }, [eventId, isEditMode]);
    
    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };

    const handleCoverImageChange = (e) => {
        setFormErrors(prev => ({ ...prev, coverImage: null }));
        const file = e.target.files[0];
        if (!file) return;
        const error = validateFile(file);
        if (error) {
            setFormErrors(prev => ({ ...prev, coverImage: error }));
            e.target.value = null;
            return;
        }
        setCoverImage({ file, preview: URL.createObjectURL(file) });
    };

    const handleSecondaryImagesChange = (e) => {
        setFormErrors(prev => ({ ...prev, secondaryImages: null }));
        const files = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];
        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                if (!errors.includes(error)) errors.push(error);
            } else {
                validFiles.push({ file, preview: URL.createObjectURL(file) });
            }
        });
        if (errors.length > 0) setFormErrors(prev => ({ ...prev, secondaryImages: errors.join(', ') }));
        setSecondaryImages(prev => [...prev, ...validFiles].slice(0, 5));
        e.target.value = null;
    };
    
    const removeSecondaryImage = (indexToRemove) => {
        if(window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            setSecondaryImages(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSecondaryImages((items) => {
                const oldIndex = items.findIndex(item => item.preview === active.id);
                const newIndex = items.findIndex(item => item.preview === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!eventType) newErrors.eventType = 'กรุณาเลือกประเภทกิจกรรม';
        if (!coverImage.preview) newErrors.coverImage = 'กรุณาอัปโหลดรูปภาพหน้าปก';
        if (!title.trim()) newErrors.title = 'กรุณากรอกหัวข้อกิจกรรม';
        if (!details || details.replace(/<(.|\n)*?>/g, '').trim().length === 0) newErrors.details = 'กรุณากรอกรายละเอียด';
        if (!startDate) newErrors.startDate = 'กรุณาเลือกวันที่เริ่มกิจกรรม';
        if (!endDate) newErrors.endDate = 'กรุณาเลือกวันที่สิ้นสุดกิจกรรม';
        setFormErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const step1Data = { eventType, title, details, startDate, endDate, publishStatus, showOnCalendar, scheduledAt, coverImage, secondaryImages };
            navigate('/admin/manage-events/add/step2', { state: { step1Data: step1Data } });
        }
    };

    return (
        <Container fluid className="manage-news-page p-0">
            <div className="content-wrapper p-3 p-md-4">
                <Container fluid className="manage-events-page">
                    <div className="page-header">
                        <h2 className="page-title">{isEditMode ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรม'}</h2>
                        <p className="text-muted">ขั้นตอนที่ 1 จาก 2: ข้อมูลกิจกรรม</p>
                    </div>

                    <Form noValidate onSubmit={handleNextStep} className="data-form">
                        <Form.Group className="mb-4">
                            <Form.Label>โปรดเลือกประเภทกิจกรรม*</Form.Label>
                            <Form.Select className="custom-form-select" value={eventType} onChange={e => setEventType(e.target.value)} isInvalid={!!formErrors.eventType}>
                                <option value="">-- เลือกประเภท --</option>
                                <option value="อบรม/สัมมนา">ทั่วไป</option>
                                <option value="ออกบูธ">ออกบูธ</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{formErrors.eventType}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>อัปโหลดรูปภาพหน้าปก*</Form.Label>
                            <p className="form-text">ใช้ 1 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                            <Form.Label htmlFor="cover-upload" className={`upload-box-square ${formErrors.coverImage ? 'is-invalid' : ''}`}>
                                {coverImage.preview ? <Image src={coverImage.preview} fluid /> : <Plus size={40} />}
                            </Form.Label>
                            <Form.Control id="cover-upload" type="file" onChange={handleCoverImageChange} hidden accept=".jpg,.png,.jpeg" />
                            {formErrors.coverImage && <Alert variant="danger" className="mt-2">{formErrors.coverImage}</Alert>}
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>อัปโหลดรูปภาพรอง (สูงสุด 5 รูป, ลากเพื่อสลับตำแหน่ง)</Form.Label>
                            <p className="form-text">ใช้รูปภาพได้สูงสุด 5 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={secondaryImages.map(img => img.preview)} strategy={horizontalListSortingStrategy}>
                                    <div className="thumbnail-container">
                                        {secondaryImages.map((img, index) => (
                                            <SortableSecondaryImage key={img.preview} image={img} index={index} onRemove={removeSecondaryImage} />
                                        ))}
                                        {secondaryImages.length < 5 && <Form.Label htmlFor="secondary-upload" className="thumbnail-upload-box"><Plus size={24} /></Form.Label>}
                                        <Form.Control id="secondary-upload" type="file" onChange={handleSecondaryImagesChange} multiple hidden accept=".jpg,.png,.jpeg" />
                                    </div>
                                </SortableContext>
                            </DndContext>
                            {formErrors.secondaryImages && <Alert variant="danger" className="mt-2">{formErrors.secondaryImages}</Alert>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>หัวข้อกิจกรรม*</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} isInvalid={!!formErrors.title} />
                            <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>รายละเอียด*</Form.Label>
                            <div className={formErrors.details ? 'tiptap-is-invalid' : ''}><TiptapEditor content={details} setContent={setDetails} /></div>
                            {formErrors.details && <div className="d-block invalid-feedback">{formErrors.details}</div>}
                        </Form.Group>
                        
                        <Row>
                            <Col md={6}><Form.Group className="mb-4"><Form.Label>วันที่เริ่มกิจกรรม*</Form.Label><div><DatePicker selected={startDate} onChange={date => setStartDate(date)} className={`form-control ${formErrors.startDate ? 'is-invalid' : ''}`} portalId="datepicker-portal" /></div>{formErrors.startDate && <div className="d-block invalid-feedback">{formErrors.startDate}</div>}</Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-4"><Form.Label>วันที่สิ้นสุดกิจกรรม*</Form.Label><div><DatePicker selected={endDate} onChange={date => setEndDate(date)} className={`form-control ${formErrors.endDate ? 'is-invalid' : ''}`} portalId="datepicker-portal" /></div>{formErrors.endDate && <div className="d-block invalid-feedback">{formErrors.endDate}</div>}</Form.Group></Col>
                        </Row>
                        <Row>
                            <Col md={6}><Form.Group className="mb-4"><Form.Label>สถานะการเผยแพร่*</Form.Label><div><Form.Check inline label="เผยแพร่" name="publishStatus" type="radio" value="เผยแพร่" checked={publishStatus === 'เผยแพร่'} onChange={(e) => setPublishStatus(e.target.value)} /><Form.Check inline label="แบบร่าง" name="publishStatus" type="radio" value="แบบร่าง" checked={publishStatus === 'แบบร่าง'} onChange={(e) => setPublishStatus(e.target.value)} /></div></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-4"><Form.Label>ตั้งเวลาเผยแพร่</Form.Label><div><DatePicker selected={scheduledAt} onChange={date => setScheduledAt(date)} showTimeSelect dateFormat="Pp" className="form-control" portalId="datepicker-portal" /></div></Form.Group></Col>
                        </Row>
                        <Row>
                            <Col md={6}><Form.Group className="mb-4"><Form.Label>สถานะการแสดงบนปฏิทิน*</Form.Label><div><Form.Check inline label="แสดง" name="showOnCalendar" type="radio" value="แสดง" checked={showOnCalendar === 'แสดง'} onChange={(e) => setShowOnCalendar(e.target.value)} /><Form.Check inline label="ไม่แสดง" name="showOnCalendar" type="radio" value="ไม่แสดง" checked={showOnCalendar === 'ไม่แสดง'} onChange={(e) => setShowOnCalendar(e.target.value)} /></div></Form.Group></Col>
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