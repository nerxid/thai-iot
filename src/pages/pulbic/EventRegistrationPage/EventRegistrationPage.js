import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Image, Carousel, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import ConfirmationModal from '../../../components/froms/ConfirmationModal';
import './EventRegistrationPage.css';
import axios from 'axios';

const EventRegistrationPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user, registerForEvent } = useAuth();
    
    const [event, setEvent] = useState(null);
    const [eventDetails, setEventDetails] = useState(null);
    const [formData, setFormData] = useState({});
    const [customPrefix, setCustomPrefix] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setIsLoading(true);
                // Fetch event form data
                const formResponse = await axios.get(`http://127.0.0.1:8000/api/events/events/${eventId}/form/`);
                const formData = formResponse.data;
                
                // Fetch event details (you might need another endpoint for this)
                const detailsResponse = await axios.get(`http://127.0.0.1:8000/api/events/events/${eventId}/`);
                const eventDetails = detailsResponse.data;
                
                // Check authorization for booth events
                if (eventDetails.event_type === 'booth' && (!user || user.memberType !== 'corporate')) {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }
                
                setIsAuthorized(true);
                setEvent(formData);
                setEventDetails(eventDetails);
                
                // Initialize form data with user info if available
                const initialFormData = {};
                if (user) {
                    const nameField = formData.fields?.find(f => f.label.includes('ชื่อ-นามสกุล'));
                    const emailField = formData.fields?.find(f => f.field_type === 'email');
                    if (nameField) initialFormData[nameField.id] = user.name || '';
                    if (emailField) initialFormData[emailField.id] = user.email || '';
                }
                setFormData(initialFormData);
            } catch (err) {
                console.error('Error fetching event data:', err);
                setError('Failed to load event data');
                navigate('/events');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventData();
    }, [eventId, navigate, user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (name === 'prefix' && value !== 'อื่นๆ...') {
            setCustomPrefix('');
        }
        if (type === 'checkbox' && event.fields.find(f => f.id.toString() === name)?.field_type === 'checkbox') {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isBoothEvent = eventDetails?.event_type === 'booth';
        const optionalFields = isBoothEvent ? ['จำนวนเจ้าหน้าที่ในบูธ'] : ['อาหารที่แพ้'];

        event.fields?.forEach(field => {
            if (field.is_required && !optionalFields.includes(field.label)) {
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
            
            if (field.field_type === 'email' && formData[field.id] && !emailRegex.test(formData[field.id])) {
                newErrors[field.id] = 'รูปแบบอีเมลไม่ถูกต้อง';
            }
        });

        if (formData.prefix === 'อื่นๆ...' && !customPrefix) {
            newErrors.customPrefix = 'กรุณาระบุคำนำหน้า';
        }

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const dataToSend = { ...formData };
                if (formData.prefix === 'อื่นๆ...') {
                    dataToSend.prefix = customPrefix;
                }
                
                // Send registration data to API
                await axios.post(`http://127.0.0.1:8000/api/events/events/${eventId}/register/`, dataToSend);
                
                // Update local state
                registerForEvent(Number(eventId));
                setShowModal(true);
            } catch (err) {
                console.error('Error submitting registration:', err);
                setError('Failed to submit registration. Please try again.');
            }
        }
    };
    
    const handleModalClose = () => {
        setShowModal(false);
        navigate('/my-events');
    };

    const renderFormField = (field) => {
        const isInvalid = !!formErrors[field.id];
        const errorMessage = formErrors[field.id];
        let inputType = field.field_type;
        if (field.label.includes('จำนวนเจ้าหน้าที่ในบูธ')) inputType = 'number';

        const options = field.options ? field.options.split(',') : [];

        switch (field.field_type) {
            case 'select':
                return (<>
                    <Form.Select 
                        name={field.id} 
                        onChange={handleChange} 
                        value={formData[field.id] || ''} 
                        isInvalid={isInvalid}
                    >
                        <option value="">เลือก...</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                </>);
            case 'radio':
                return (
                    <div className={`d-flex flex-wrap gap-3 pt-2 ${isInvalid ? 'is-invalid' : ''}`}>
                        {options.map(opt => (
                            <Form.Check 
                                inline 
                                key={opt} 
                                type="radio" 
                                id={`${field.id}-${opt}`} 
                                name={field.id} 
                                value={opt} 
                                label={opt} 
                                onChange={handleChange} 
                                checked={formData[field.id] === opt} 
                            />
                        ))}
                        {isInvalid && <div className="invalid-feedback d-block">{errorMessage}</div>}
                    </div>
                );
            case 'checkbox':
                return(
                    <div className={`d-flex flex-wrap gap-3 pt-2 ${isInvalid ? 'is-invalid' : ''}`}>
                        {options.map(opt => (
                            <Form.Check 
                                inline 
                                key={opt} 
                                type="checkbox" 
                                id={`${field.id}-${opt}`} 
                                name={field.id} 
                                value={opt} 
                                label={opt} 
                                onChange={handleChange} 
                                checked={Array.isArray(formData[field.id]) && formData[field.id].includes(opt)} 
                            />
                        ))}
                        {isInvalid && <div className="invalid-feedback d-block">{errorMessage}</div>}
                    </div>
                );
            case 'textarea':
                return (<>
                    <Form.Control 
                        as="textarea" 
                        rows={4} 
                        name={field.id} 
                        onChange={handleChange} 
                        value={formData[field.id] || ''} 
                        isInvalid={isInvalid} 
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                </>);
            default:
                return (<>
                    <Form.Control 
                        type={inputType} 
                        name={field.id} 
                        onChange={handleChange} 
                        value={formData[field.id] || ''} 
                        isInvalid={isInvalid} 
                        min={inputType === 'number' ? 1 : undefined} 
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                </>);
        }
    };
    
    if (!isAuthorized) { 
        return ( 
            <Container className="my-5">
                <Alert variant="danger">
                    <Alert.Heading>ไม่มีสิทธิ์เข้าถึง</Alert.Heading>
                    <p>กิจกรรมนี้สงวนสิทธิ์สำหรับสมาชิกประเภทนิติบุคคลเท่านั้น</p>
                    <Button onClick={() => navigate('/events')} variant="outline-danger">
                        กลับสู่หน้ารวมกิจกรรม
                    </Button>
                </Alert>
            </Container> 
        ); 
    }
    
    if (isLoading) {
        return (
            <Container className="my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">กำลังโหลดข้อมูล...</p>
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <Alert.Heading>เกิดข้อผิดพลาด</Alert.Heading>
                    <p>{error}</p>
                    <Button onClick={() => navigate('/events')} variant="outline-danger">
                        กลับสู่หน้ารวมกิจกรรม
                    </Button>
                </Alert>
            </Container>
        );
    }
    
    if (!event || !eventDetails) return null;

    return (
        <>
            <div className="event-reg-page-container">
                <Container>
                    <div className="event-reg-card">
                        <h1 className="event-reg-title">
                            {eventDetails.event_type === 'booth' ? 'ฟอร์มลงทะเบียนออกบูธ' : 'ฟอร์มเข้าร่วมกิจกรรม'}
                        </h1>
                        <div className="form-section">
                            <h3 className="form-section-title">รายละเอียดกิจกรรม</h3>
                            <div className="event-details-content">
                                <h4>{eventDetails.title}</h4>
                                <p>{eventDetails.description}</p>
                                {/* Add more event details as needed */}
                            </div>
                        </div>
                        {eventDetails.poster_images && eventDetails.poster_images.length > 0 && (
                            <div className="form-section">
                                <h3 className="form-section-title">กำหนดการเข้าร่วมกิจกรรม</h3>
                                <Carousel indicators={false} className="poster-carousel shadow-sm">
                                    {eventDetails.poster_images.map((imgUrl, index) => (
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
                                    {event.fields?.sort((a, b) => a.display_order - b.display_order).map(field => (
                                        <React.Fragment key={field.id}>
                                            <Col xs={12} md={field.id === 'eventDates' ? 12 : 6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        {field.label}{field.is_required ? '*' : ''}
                                                    </Form.Label>
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
                                                            isInvalid={!!formErrors.customPrefix} 
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {formErrors.customPrefix}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Row>
                                <hr className="my-4"/>
                                <Form.Check 
                                    type="checkbox" 
                                    id="consent-data" 
                                    label="ยินยอมให้ใช้ข้อมูลส่วนตัว" 
                                    className="mb-2"
                                />
                                <Form.Check 
                                    type="checkbox" 
                                    id="consent-pr" 
                                    label="ยินยอมให้มีภาพถ่ายเพื่อประชาสัมพันธ์" 
                                />
                                <div className="form-actions">
                                    <Button 
                                        variant="outline-secondary" 
                                        onClick={() => navigate(`/events/${eventId}`)}
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        {eventDetails.event_type === 'booth' ? 'เข้าร่วมออกบูธ' : 'เข้าร่วมกิจกรรม'}
                                    </Button>
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
                body={`ระบบได้บันทึกการลงทะเบียนสำหรับกิจกรรม "${eventDetails?.title}" ของคุณเรียบร้อยแล้ว`} 
                variant="success" 
            />
        </>
    );
};

export default EventRegistrationPage;