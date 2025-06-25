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
                initialFormData.email = user.email || '';
                initialFormData.firstName = user.name || '';
                if(user.memberType === 'corporate' && user.companyName){
                    initialFormData.company = user.companyName;
                }
            }
            currentEvent.formFields?.forEach(field => {
                if (field.type === 'checkbox') {
                    initialFormData[field.id] = [];
                } else if (!initialFormData[field.id]) { 
                    initialFormData[field.id] = '';
                }
            });
            setFormData(initialFormData);
        } else {
            navigate('/events'); 
        }
    }, [eventId, navigate, user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'prefix' && value !== 'อื่นๆ...') {
            setCustomPrefix('');
        }

        if (type === 'checkbox' && event.formFields.find(f => f.id === name)?.type === 'checkbox') {
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

        const dataToSend = { ...formData };
        if (formData.prefix === 'อื่นๆ...') {
            dataToSend.prefix = customPrefix;
        }

        registerForEvent(Number(eventId));
        setShowModal(true);
    };
    
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/my-events');
    };

    const renderFormField = (field) => {
        switch (field.type) {
            case 'select':
                return (
                    <Form.Select name={field.id} onChange={handleChange} value={formData[field.id] || ''} required={field.required}>
                        <option value="">เลือก...</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Form.Select>
                );
            case 'radio':
                return (
                    <div className="d-flex flex-wrap gap-3 pt-2">
                        {field.options.map(opt => <Form.Check inline key={opt} type="radio" id={`${field.id}-${opt}`} name={field.id} value={opt} label={opt} onChange={handleChange} checked={formData[field.id] === opt} />)}
                    </div>
                );
            case 'checkbox':
                return(
                    <div className="d-flex flex-wrap gap-3 pt-2">
                        {field.options.map(opt => <Form.Check inline key={opt} type="checkbox" id={`${field.id}-${opt}`} name={field.id} value={opt} label={opt} onChange={handleChange} checked={Array.isArray(formData[field.id]) && formData[field.id].includes(opt)} />)}
                    </div>
                );
            case 'textarea':
                 return <Form.Control as="textarea" rows={4} name={field.id} onChange={handleChange} value={formData[field.id] || ''} required={field.required} />;
            default:
                return <Form.Control type={field.type} name={field.id} onChange={handleChange} value={formData[field.id] || ''} required={field.required} />;
        }
    };
    
    if (!isAuthorized) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <Alert.Heading>ไม่มีสิทธิ์เข้าถึง</Alert.Heading>
                    <p>กิจกรรมนี้สงวนสิทธิ์สำหรับสมาชิกประเภทนิติบุคคลเท่านั้น</p>
                    <Button onClick={() => navigate('/events')} variant="outline-danger">กลับสู่หน้ารวมกิจกรรม</Button>
                </Alert>
            </Container>
        );
    }

    if (!event) return null;

    const isBoothEvent = event.type === 'booth';
    const pageTitle = isBoothEvent ? 'ฟอร์มลงทะเบียนออกบูธ' : 'ฟอร์มเข้าร่วมกิจกรรม';
    const sectionTitle = 'กรอกข้อมูลเพื่อเข้าร่วม';
    const submitButtonText = isBoothEvent ? 'เข้าร่วมออกบูธ' : 'เข้าร่วมกิจกรรม';

    return (
        <>
            <div className="event-reg-page-container">
                <Container>
                    <div className="event-reg-card">
                        <h1 className="event-reg-title">{pageTitle}</h1>
                        
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
                            <h3 className="form-section-title">{sectionTitle}</h3>
                            <Form onSubmit={handleSubmit} className="registration-form-fields">
                                <Row className="g-4">
                                    {event.formFields?.map(field => (
                                        <React.Fragment key={field.id}>
                                            <Col xs={12} md={field.id === 'eventDates' ? 12 : 6}>
                                                <Form.Group>
                                                    <Form.Label>{field.label}</Form.Label>
                                                    {renderFormField(field)}
                                                </Form.Group>
                                            </Col>
                                            {field.id === 'prefix' && formData.prefix === 'อื่นๆ...' && (
                                                <Col xs={12} md={6}>
                                                    <Form.Group>
                                                        <Form.Label>ระบุคำนำหน้า*</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={customPrefix}
                                                            onChange={(e) => setCustomPrefix(e.target.value)}
                                                            placeholder="เช่น ดร., ผศ."
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Row>
                                <hr className="my-4"/>
                                <Form.Check type="checkbox" id="consent-data" label="ยินยอมให้ใช้ข้อมูลส่วนตัว" required className="mb-2"/>
                                <Form.Check type="checkbox" id="consent-pr" label="ยินยอมให้มีภาพถ่ายเพื่อประชาสัมพันธ์" required />
                                <div className="form-actions">
                                    <Button variant="outline-secondary" onClick={() => navigate(`/events/${eventId}`)}>ยกเลิก</Button>
                                    <Button variant="primary" type="submit">{submitButtonText}</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>

            <ConfirmationModal
                show={showModal}
                onHide={handleModalClose}
                title="ลงทะเบียนสำเร็จ!"
                body={`ระบบได้บันทึกการลงทะเบียนสำหรับกิจกรรม "${event.title}" ของคุณเรียบร้อยแล้ว`}
                variant="success"
            />
        </>
    );
};

export default EventRegistrationPage;