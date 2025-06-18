import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Breadcrumb, Card } from 'react-bootstrap';
import { rawEventsData } from '../../../data/mock-events';
import './EventDetailPage.css';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const event = rawEventsData.find(item => item.id.toString() === eventId);

    if (!event) {
        return (
            <Container className="my-5 text-center">
                <h2>404 - ไม่พบกิจกรรม</h2>
                <p>ขออภัย ไม่พบกิจกรรมที่คุณกำลังค้นหา</p>
                <Link to="/events" className="btn btn-primary">กลับสู่หน้ารวมกิจกรรม</Link>
            </Container>
        );
    }

    const otherEvents = rawEventsData.filter(item => item.id.toString() !== eventId).slice(0, 3);
    const eventStartDate = new Date(event.start);

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
                            <div className="event-content-body" dangerouslySetInnerHTML={{ __html: event.content }} />
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