import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Image, Breadcrumb, Card, Button } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../../../context/AuthContext';
import { rawEventsData } from '../../../data/mock-events';
import './EventDetailPage.css';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoggedIn, isRegisteredForEvent, unregisterFromEvent } = useAuth();

    const event = rawEventsData.find(item => item.id.toString() === eventId);
    
    if (event && event.type === 'booth' && (!user || user.memberType !== 'corporate')) {
        return (
            <Container className="my-5 text-center">
                <h2>403 - ไม่มีสิทธิ์เข้าถึง</h2>
                <p>ขออภัย กิจกรรมนี้สงวนสิทธิ์สำหรับสมาชิกประเภทนิติบุคคลเท่านั้น</p>
                <Link to="/events" className="btn btn-primary">กลับสู่หน้ารวมกิจกรรม</Link>
            </Container>
        );
    }
    
    if (!event) {
        return (
            <Container className="my-5 text-center">
                <h2>404 - ไม่พบกิจกรรม</h2>
                <p>ขออภัย ไม่พบกิจกรรมที่คุณกำลังค้นหา</p>
                <Link to="/events" className="btn btn-primary">กลับสู่หน้ารวมกิจกรรม</Link>
            </Container>
        );
    }

    const eventEndDate = new Date(event.end).setHours(23, 59, 59, 999);
    const isPastEvent = eventEndDate < new Date();
    const isRegistered = isRegisteredForEvent(event.id);

    const handleRegisterClick = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: location } });
            return;
        }
        navigate(`/events/${event.id}/register`);
    };

    const handleUnregisterClick = () => {
        if (window.confirm(`คุณต้องการยกเลิกการลงทะเบียนกิจกรรม "${event.title}" ใช่หรือไม่?`)) {
            unregisterFromEvent(event.id);
            alert('คุณได้ยกเลิกการลงทะเบียนเรียบร้อยแล้ว');
        }
    };

    const otherEvents = rawEventsData.filter(item => 
        item.id.toString() !== eventId && 
        (item.type !== 'booth' || (user && user.memberType === 'corporate'))
    ).slice(0, 3);
    
    const eventStartDate = new Date(event.start);

    const renderActionButton = () => {
        if (isPastEvent) {
            return (
                <div className="registration-status-badge past-event">
                    <XCircleFill size={20} className="me-2" />
                    กิจกรรมนี้สิ้นสุดแล้ว
                </div>
            );
        }

        if (isRegistered) {
            return (
                <div className="registration-actions">
                    <div className="registration-status-badge registered">
                        <CheckCircleFill size={20} className="me-2" />
                        คุณได้ลงทะเบียนแล้ว
                    </div>
                    <Button variant="outline-danger" className="cancel-button" onClick={handleUnregisterClick}>
                        ยกเลิกการลงทะเบียน
                    </Button>
                </div>
            );
        }

        const isBoothEvent = event.type === 'booth';
        let buttonText = 'เข้าร่วมกิจกรรม';
        if (isBoothEvent) {
            buttonText = 'เข้าร่วมออกบูธ';
        }
        if (!isLoggedIn) {
            buttonText = 'เข้าสู่ระบบเพื่อเข้าร่วม';
        }
        
        return (
            <Button variant="primary" size="lg" className="w-100 action-button" onClick={handleRegisterClick}>
                {buttonText}
            </Button>
        );
    };

    return (
        <div className="event-detail-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className="event-content-container">
                            <Breadcrumb className="event-breadcrumb">
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าแรก</Breadcrumb.Item>
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>กิจกรรม</Breadcrumb.Item>
                                <Breadcrumb.Item active>{event.title}</Breadcrumb.Item>
                            </Breadcrumb>
                            
                            <header className="event-header">
                                <h1 className="event-title">{event.title}</h1>
                                <p className="event-meta">
                                    วันที่จัดกิจกรรม: {eventStartDate.toLocaleDateString('th-TH', { dateStyle: 'full' })}
                                </p>
                            </header>

                            <Image src={event.fullImageUrl} fluid rounded className="mb-4 shadow-sm event-image" />
                            <div className="event-content-body" dangerouslySetInnerHTML={{ __html: event.content || event.details }} />

                            <div className="action-button-container">
                                {renderActionButton()}
                            </div>
                        </div>

                        {otherEvents.length > 0 && (
                            <div className="related-events-section">
                                <h3 className="related-events-title">กิจกรรมอื่นๆ ที่น่าสนใจ</h3>
                                <Row>
                                    {otherEvents.map(item => (
                                        <Col md={4} key={item.id} className="mb-3">
                                            <Card className="h-100 border-0 shadow-sm related-event-card">
                                                <Card.Img variant="top" src={item.imageUrl} />
                                                <Card.Body>
                                                    <Card.Title className="related-card-title">{item.title}</Card.Title>
                                                    <Link to={`/events/${item.id}`} className="stretched-link">ดูรายละเอียด</Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventDetailPage;