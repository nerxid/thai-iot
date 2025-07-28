import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Image, Carousel, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { rawEventsData } from '../../../data/mock-events';
import ConfirmationModal from '../../../components/froms/ConfirmationModal';
import './EventRegistrationPage.css';

const EventRegistrationPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user, registerForEvent } = useAuth();
    
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({});
    const [customPrefix, setCustomPrefix] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const currentEvent = rawEventsData.find(item => item.id.toString() === eventId);
        
        if (currentEvent) {
            if (currentEvent.type === 'booth' && (!user || user.memberType !== 'corporate')) {
                setIsAuthorized(false);
                return;
            }
            setIsAuthorized(true);
            setEvent(currentEvent);
            const initialFormData = {};
            if (user) {
                const nameField = currentEvent.formFields?.find(f => f.label.includes('ชื่อ-นามสกุล'));
                const emailField = currentEvent.formFields?.find(f => f.type === 'email');
                if (nameField) initialFormData[nameField.id] = user.name || '';
                if (emailField) initialFormData[emailField.id] = user.email || '';
            }
            setFormData(initialFormData);
        } else {
            navigate('/events'); 
        }
    }, [eventId, navigate, user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (name === 'prefix' && value !== 'อื่นๆ...') {
            setCustomPrefix('');
        }
        if (type === 'checkbox' && event.formFields.find(f => f.id.toString() === name)?.type === 'checkbox') {
             setFormData(prev => {
                 const currentSelection = prev[name] || [];
                 if (checked) {
                     return { ...prev, [name]: [...currentSelection, value] };
                 } else {
                     return { ...prev, [name]: currentSelection.filter(item => item !== value) };
                 }
             });
        } else {
             setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isBoothEvent = event.type === 'booth';
        const optionalFields = isBoothEvent ? ['จำนวนเจ้าหน้าที่ในบูธ'] : ['อาหารที่แพ้'];

        event.formFields?.forEach(field => {
            if (field.required && !optionalFields.includes(field.label)) {
                const value = formData[field.id];
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    newErrors[field.id] = `กรุณากรอกข้อมูล "${field.label}"`;
                }
            }
            if (field.label.includes('เบอร์โทรศัพท์') && formData[field.id] && formData[field.id].length !== 10) {
                 newErrors[field.id] = 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก';
            }
            if (field.label.includes('จำนวนเจ้าหน้าที่ในบูธ')) {
                const value = formData[field.id];
                if (value && (isNaN(value) || Number(value) <= 0)) {
                    newErrors[field.id] = 'จำนวนเจ้าหน้าที่ต้องเป็นตัวเลขที่มากกว่า 0';
                }
            }
            
            if (field.type === 'email' && formData[field.id] && !emailRegex.test(formData[field.id])) {
                newErrors[field.id] = 'รูปแบบอีเมลไม่ถูกต้อง';
            }
        });

        if (formData.prefix === 'อื่นๆ...' && !customPrefix) {
            newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const dataToSend = { ...formData };
            if (formData.prefix === 'อื่นๆ...') {
                dataToSend.prefix = customPrefix;
            }
            
            console.log('Submitting Event Registration Data:', dataToSend);
            registerForEvent(Number(eventId));
            setShowModal(true);
        }
    };
    
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/my-events');
    };

    const renderFormField = (field) => {
        const isInvalid = !!formErrors[field.id];
        const errorMessage = formErrors[field.id];
        let inputType = field.type;
        if (field.label.includes('จำนวนเจ้าหน้าที่ในบูธ')) inputType = 'number';

        switch (field.type) {
            case 'select':
                return (<><Form.Select name={field.id} onChange={handleChange} value={formData[field.id] || ''} isInvalid={isInvalid}><option value="">เลือก...</option>{field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</Form.Select><Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback></>);
            case 'radio':
                return (<div className={`d-flex flex-wrap gap-3 pt-2 ${isInvalid ? 'is-invalid' : ''}`}>{field.options.map(opt => <Form.Check inline key={opt} type="radio" id={`${field.id}-${opt}`} name={field.id} value={opt} label={opt} onChange={handleChange} checked={formData[field.id] === opt} />)}{isInvalid && <div className="invalid-feedback d-block">{errorMessage}</div>}</div>);
            case 'checkbox':
                return(<div className={`d-flex flex-wrap gap-3 pt-2 ${isInvalid ? 'is-invalid' : ''}`}>{field.options.map(opt => <Form.Check inline key={opt} type="checkbox" id={`${field.id}-${opt}`} name={field.id} value={opt} label={opt} onChange={handleChange} checked={Array.isArray(formData[field.id]) && formData[field.id].includes(opt)} />)}{isInvalid && <div className="invalid-feedback d-block">{errorMessage}</div>}</div>);
            case 'textarea':
                return (<><Form.Control as="textarea" rows={4} name={field.id} onChange={handleChange} value={formData[field.id] || ''} isInvalid={isInvalid} /><Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback></>);
            default:
                return (<><Form.Control type={inputType} name={field.id} onChange={handleChange} value={formData[field.id] || ''} isInvalid={isInvalid} min={inputType === 'number' ? 1 : undefined} /><Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback></>);
        }
    };
    
    if (!isAuthorized) { return ( <Container className="my-5"><Alert variant="danger"><Alert.Heading>ไม่มีสิทธิ์เข้าถึง</Alert.Heading><p>กิจกรรมนี้สงวนสิทธิ์สำหรับสมาชิกประเภทนิติบุคคลเท่านั้น</p><Button onClick={() => navigate('/events')} variant="outline-danger">กลับสู่หน้ารวมกิจกรรม</Button></Alert></Container> ); }
    if (!event) return null;

    return (
        <>
            <div className="event-reg-page-container">
                <Container>
                    <div className="event-reg-card">
                        <h1 className="event-reg-title">{event.type === 'booth' ? 'ฟอร์มลงทะเบียนออกบูธ' : 'ฟอร์มเข้าร่วมกิจกรรม'}</h1>
                        <div className="form-section">
                            <h3 className="form-section-title">รายละเอียดกิจกรรม</h3>
                            <div className="event-details-content" dangerouslySetInnerHTML={{ __html: event.details }} />
                        </div>
                        {event.posterImages && event.posterImages.length > 0 && (
                            <div className="form-section">
                                <h3 className="form-section-title">กำหนดการเข้าร่วมกิจกรรม</h3>
                                <Carousel indicators={false} className="poster-carousel shadow-sm">
                                    {event.posterImages.map((imgUrl, index) => (
                                        <Carousel.Item key={index} className="poster-carousel-item">
                                            <Image src={imgUrl} className="carousel-image" />
                                        </Carousel.Item>
                                    ))}
                                 </Carousel>
                            </div>
                        )}
                        <div className="form-section">
                            <h3 className="form-section-title">กรอกข้อมูลเพื่อเข้าร่วม</h3>
                            <Form noValidate onSubmit={handleSubmit} className="registration-form-fields">
                                <Row className="g-4">
                                    {event.formFields?.map(field => (
                                        <React.Fragment key={field.id}>
                                            <Col xs={12} md={field.id === 'eventDates' ? 12 : 6}>
                                                <Form.Group>
                                                    <Form.Label>{field.label}{field.required ? '*' : ''}</Form.Label>
                                                    {renderFormField(field)}
                                                </Form.Group>
                                            </Col>
                                            {field.id === 'prefix' && formData.prefix === 'อื่นๆ...' && (
                                                <Col xs={12} md={6}>
                                                    <Form.Group>
                                                        <Form.Label>ระบุคำนำหน้า*</Form.Label>
                                                        <Form.Control type="text" value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} placeholder="เช่น ดร., ผศ." isInvalid={!!formErrors.customPrefix} />
                                                        <Form.Control.Feedback type="invalid">{formErrors.customPrefix}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Row>
                                <hr className="my-4"/>
                                <Form.Check type="checkbox" id="consent-data" label="ยินยอมให้ใช้ข้อมูลส่วนตัว" className="mb-2"/>
                                <Form.Check type="checkbox" id="consent-pr" label="ยินยอมให้มีภาพถ่ายเพื่อประชาสัมพันธ์" />
                                <div className="form-actions">
                                    <Button variant="outline-secondary" onClick={() => navigate(`/events/${eventId}`)}>ยกเลิก</Button>
                                    <Button variant="primary" type="submit">
                                        {event.type === 'booth' ? 'เข้าร่วมออกบูธ' : 'เข้าร่วมกิจกรรม'}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
            <ConfirmationModal show={showModal} onHide={handleModalClose} title="ลงทะเบียนสำเร็จ!" body={`ระบบได้บันทึกการลงทะเบียนสำหรับกิจกรรม "${event?.title}" ของคุณเรียบร้อยแล้ว`} variant="success" />
        </>
    );
};

export default EventRegistrationPage;