import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card, InputGroup, Image, Carousel, Alert } from 'react-bootstrap';
import { BsPlusLg, BsTrashFill, BsGripVertical, BsCalendarDate, BsClock, BsCloudUpload, BsX } from 'react-icons/bs';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../ManageNews/ManageNewsAndEvents.css';

const SortablePosterImage = ({ image, index, onRemove, onSelect, isActive }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.preview });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab' };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="thumbnail-item" onClick={() => onSelect(index)}>
            <Image src={image.preview} thumbnail active={isActive} />
            <Button variant="danger" size="sm" className="thumbnail-delete-btn" onPointerDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onRemove(index); }}>
                <BsX size={16} />
            </Button>
        </div>
    );
};

const generalEventFieldsTemplate = [ { id: Date.now() + 1, label: 'ชื่อ-นามสกุล ผู้เข้าร่วม', type: 'Short Answer', isRequired: true, options: [] }, { id: Date.now() + 2, label: 'เพศ', type: 'Multiple choice', isRequired: true, options: [{ id: 1, value: 'ชาย' }, { id: 2, value: 'หญิง' }, { id: 3, value: 'ไม่ระบุ' }] }, { id: Date.now() + 3, label: 'ตำแหน่งงาน', type: 'Short Answer', isRequired: false, options: [] }, { id: Date.now() + 4, label: 'ชื่อหน่วยงาน/บริษัท', type: 'Short Answer', isRequired: true, options: [] }, { id: Date.now() + 5, label: 'เบอร์โทรศัพท์', type: 'tel', isRequired: true, options: [] }, { id: Date.now() + 6, label: 'อีเมล', type: 'email', isRequired: true, options: [] }, { id: Date.now() + 7, label: 'อาหารที่แพ้', type: 'Short Answer', isRequired: false, options: [] }, ];
const boothEventFieldsTemplate = [ { id: Date.now() + 1, label: 'ชื่อ-นามสกุล ผู้ประสานงานหลัก', type: 'Short Answer', isRequired: true, options: [] }, { id: Date.now() + 2, label: 'เพศ', type: 'Multiple choice', isRequired: true, options: [{ id: 1, value: 'ชาย' }, { id: 2, value: 'หญิง' }, { id: 3, value: 'ไม่ระบุ' }] }, { id: Date.now() + 3, label: 'ตำแหน่งงาน', type: 'Short Answer', isRequired: true, options: [] }, { id: Date.now() + 4, label: 'ชื่อหน่วยงาน/บริษัท', type: 'Short Answer', isRequired: true, options: [] }, { id: Date.now() + 5, label: 'เบอร์โทรศัพท์', type: 'tel', isRequired: true, options: [] }, { id: Date.now() + 6, label: 'อีเมล', type: 'email', isRequired: true, options: [] }, { id: Date.now() + 7, label: 'วันที่ออกบูธ (กรณีมีหลายวัน)', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'วันที่ 1' }, { id: 2, value: 'วันที่ 2' }] }, { id: Date.now() + 8, label: 'จำนวนเจ้าหน้าที่ในบูธ', type: 'Short Answer', isRequired: false, options: [] }, ];

const EventRegistrationFormBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const step1Data = location.state?.step1Data;

    const [formFields, setFormFields] = useState([]);
    const [posterImages, setPosterImages] = useState([]);
    const [posterIndex, setPosterIndex] = useState(0);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (!step1Data) {
            alert('กรุณากรอกข้อมูลกิจกรรมในขั้นตอนที่ 1 ก่อน');
            navigate('/admin/manage-events/add');
            return;
        }
        const eventType = step1Data?.eventType;
        if (eventType === 'ออกบูธ') setFormFields(boothEventFieldsTemplate);
        else setFormFields(generalEventFieldsTemplate);
    }, [step1Data, navigate]);
    
    const addField = () => setFormFields([...formFields, { id: Date.now(), label: '', type: 'Short Answer', placeholder: '', isRequired: false, options: [] }]);
    const removeField = (id) => setFormFields(formFields.filter(field => field.id !== id));
    const handleFieldChange = (id, property, value) => setFormFields(formFields.map(field => field.id === id ? { ...field, [property]: value } : field));
    const addOption = (fieldId) => { setFormFields(formFields.map(field => { if (field.id === fieldId) { const newOption = { id: Date.now(), value: `ตัวเลือก ${field.options.length + 1}` }; return { ...field, options: [...field.options, newOption] }; } return field; })); };
    const removeOption = (fieldId, optionId) => { setFormFields(formFields.map(field => { if (field.id === fieldId) { return { ...field, options: field.options.filter(opt => opt.id !== optionId) }; } return field; })); };
    const handleOptionChange = (fieldId, optionId, newValue) => { setFormFields(formFields.map(field => { if (field.id === fieldId) { return { ...field, options: field.options.map(opt => opt.id === optionId ? {...opt, value: newValue} : opt) }; } return field; })); }


    const validateFile = (file) => {
        const MAX_SIZE_MB = 1;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!ALLOWED_TYPES.includes(file.type)) return 'ต้องเป็นไฟล์ .jpg หรือ .png เท่านั้น';
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_SIZE_MB}MB`;
        return null;
    };
    const handlePosterImagesChange = (e) => {
        setFormErrors(prev => ({ ...prev, posterImages: null }));
        const files = Array.from(e.target.files);
        const validFiles = [], errors = [];
        files.forEach(file => {
            const error = validateFile(file);
            if (error) { if (!errors.includes(error)) errors.push(error); }
            else validFiles.push({ file: file, preview: URL.createObjectURL(file) });
        });
        if (errors.length > 0) setFormErrors(prev => ({ ...prev, posterImages: errors.join(', ') }));
        if (validFiles.length > 0) setPosterImages(prev => [...prev, ...validFiles].slice(0, 5));
        e.target.value = null;
    };
    const removePosterImage = (indexToRemove) => {
        if (window.confirm('คุณต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
            setPosterImages(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };
    const handlePosterDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setPosterImages((items) => {
                const oldIndex = items.findIndex(item => item.preview === active.id);
                const newIndex = items.findIndex(item => item.preview === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    const handleFinalSubmit = () => {
        const finalEventData = { ...step1Data, posterImages, registrationForm: formFields };
        console.log("Final Event Data (Step 1 + Step 2):", finalEventData);
        alert('สร้างกิจกรรมและฟอร์มลงทะเบียนสำเร็จ!');
        navigate('/admin/manage-events');
    };
    
    const renderFieldPreview = (field) => {
        switch (field.type) {
            case 'Short Answer': return <Form.Control type="text" placeholder="คำตอบสั้นๆ" disabled />;
            case 'Paragraph': return <Form.Control as="textarea" rows={3} placeholder="คำตอบยาวๆ" disabled />;
            case 'Multiple choice': return <div className="mt-2">{field.options.map(opt => <Form.Check type="radio" key={opt.id} label={opt.value} name={`preview-${field.id}`} disabled />)}</div>;
            case 'Checkboxes': return <div className="mt-2">{field.options.map(opt => <Form.Check type="checkbox" key={opt.id} label={opt.value} disabled />)}</div>;
            case 'Dropdown': return <Form.Select disabled><option>{field.options.length > 0 ? field.options[0].value : 'ตัวเลือก 1'}</option></Form.Select>;
            case 'File upload': return <InputGroup><Form.Control placeholder="ผู้ใช้จะเห็นปุ่มอัปโหลดไฟล์" disabled /><InputGroup.Text><BsCloudUpload /></InputGroup.Text></InputGroup>;
            case 'Date': return <InputGroup><Form.Control placeholder="ผู้ใช้จะเห็นปฏิทินให้เลือก" disabled /><InputGroup.Text><BsCalendarDate /></InputGroup.Text></InputGroup>;
            case 'Time': return <InputGroup><Form.Control placeholder="ผู้ใช้จะเห็นช่องเลือกเวลา" disabled /><InputGroup.Text><BsClock /></InputGroup.Text></InputGroup>;
            default: return null;
        }
    };

    return (
        <Container fluid className="manage-news-page p-0">
            <div className="content-wrapper p-3 p-md-4">
                <Container fluid className="manage-events-page">
                    <div className="page-header">
                        <h2 className="page-title">สร้างฟอร์มกิจกรรม</h2>
                        <p className="text-muted">ขั้นตอนที่ 2 จาก 2</p>
                    </div>

                    <Card className="mb-4">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>ชื่อฟอร์ม (มาจากหัวข้อกิจกรรม)</Form.Label>
                                <Form.Control type="text" value={step1Data?.title || ''} readOnly disabled/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>คำอธิบาย (มาจากรายละเอียดกิจกรรม)</Form.Label>
                                <Form.Control as="textarea" rows={3} value={step1Data?.details.replace(/<[^>]*>?/gm, '') || ''} readOnly disabled />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>รูปภาพโปสเตอร์ประชาสัมพันธ์</Card.Title>
                            <hr />
                            <Form.Group>
                                <p className="form-text">ใช้รูปภาพได้สูงสุด 5 รูป, .jpg, .png, .jpeg, ขนาดไม่เกิน 1 MB</p>
                                <div className="poster-preview-main mb-3">
                                    {posterImages.length > 0 ? (
                                        <Carousel activeIndex={posterIndex} onSelect={(idx) => setPosterIndex(idx)} interval={null} variant="dark">
                                            {posterImages.map((item, index) => (
                                                <Carousel.Item key={index}><Image src={item.preview} fluid /></Carousel.Item>
                                            ))}
                                        </Carousel>
                                    ) : (
                                        <div className="upload-placeholder-rect"><span>ตัวอย่างโปสเตอร์</span></div>
                                    )}
                                </div>
                                {formErrors.posterImages && <Alert variant="danger" className="mt-2">{formErrors.posterImages}</Alert>}
                                <DndContext collisionDetection={closestCenter} onDragEnd={handlePosterDragEnd}>
                                    <SortableContext items={posterImages.map(item => item.preview)} strategy={horizontalListSortingStrategy}>
                                        <div className="thumbnail-container">
                                            {posterImages.map((img, index) => (
                                                <SortablePosterImage key={img.preview} image={img} index={index} onRemove={removePosterImage} onSelect={setPosterIndex} isActive={index === posterIndex} />
                                            ))}
                                            {posterImages.length < 5 && 
                                                <Form.Label htmlFor="poster-upload" className="thumbnail-upload-box">
                                                    {/* << 3. แก้ไขชื่อไอคอนที่เรียกใช้ >> */}
                                                    <BsPlusLg size={24} />
                                                </Form.Label>
                                            }
                                            <Form.Control id="poster-upload" type="file" onChange={handlePosterImagesChange} multiple hidden accept=".jpg,.png,.jpeg" />
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <Card className="form-builder-section mt-4">
                       <Card.Body>
                            <Card.Title>ออกแบบฟอร์มลงทะเบียน</Card.Title>
                            <hr />
                            {formFields.map((field) => (
                                <Card key={field.id} className="mb-3 form-builder-question-card">
                                    <Card.Body>
                                        <Row className="g-2">
                                            <Col xs={12} md={8}><Form.Control type="text" value={field.label} onChange={e => handleFieldChange(field.id, 'label', e.target.value)} placeholder="ใส่คำถามของคุณที่นี่"/></Col>
                                            <Col xs={12} md={4}>
                                                <Form.Select className="custom-form-select" value={field.type} onChange={e => handleFieldChange(field.id, 'type', e.target.value)}>
                                                    <option value="Short Answer">Short Answer</option><option value="Paragraph">Paragraph</option><option value="Multiple choice">Multiple choice</option><option value="Checkboxes">Checkboxes</option><option value="Dropdown">Dropdown</option><option value="File upload">File upload</option><option value="Date">Date</option><option value="Time">Time</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <div className="field-preview-container">{renderFieldPreview(field)}</div>
                                        {(field.type === 'Multiple choice' || field.type === 'Checkboxes' || field.type === 'Dropdown') && (
                                            <div className="mt-3 ps-2">
                                                <h6 className="text-muted small">แก้ไขตัวเลือก:</h6>
                                                {field.options.map(opt => (
                                                    <div key={opt.id} className="option-item mb-2">
                                                        <BsGripVertical className="text-muted" />
                                                        <Form.Control type="text" value={opt.value} onChange={e => handleOptionChange(field.id, opt.id, e.target.value)} />
                                                        <Button variant="light" size="sm" onClick={() => removeOption(field.id, opt.id)}><BsTrashFill /></Button>
                                                    </div>
                                                ))}
                                                <Button variant="link" size="sm" onClick={() => addOption(field.id)}>+ เพิ่มตัวเลือก</Button>
                                            </div>
                                        )}
                                        <hr className="my-3"/>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Form.Check type="switch" id={`required-${field.id}`} label="จำเป็น" checked={field.isRequired} onChange={e => handleFieldChange(field.id, 'isRequired', e.target.checked)} />
                                            <span className="vr mx-3"></span>
                                            <Button variant="light" onClick={() => removeField(field.id)}><BsTrashFill /></Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            <Button variant="outline-primary" onClick={addField}><BsPlusLg /> เพิ่มคำถาม</Button>
                        </Card.Body>
                    </Card>

                    <div className="form-actions mt-4">
                        <Button variant="secondary" type="button" onClick={() => navigate('/admin/manage-events/add', { state: { step1Data: step1Data } })}>ย้อนกลับ</Button>
                        <Button variant="primary" onClick={handleFinalSubmit}>บันทึก</Button>
                    </div>
                </Container>
            </div>
        </Container>
    );
};

export default EventRegistrationFormBuilder;