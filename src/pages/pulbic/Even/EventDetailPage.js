import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Breadcrumb } from 'react-bootstrap';
import { rawEventsData } from '../../../data/mock-events';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const event = rawEventsData.find(item => item.id.toString() === eventId);

  if (!event) {
    return (
      <Container className="my-5 text-center">
        <h2>404 - ไม่พบกิจกรรม</h2>
        <Link to="/events">กลับไปที่หน้ารายการกิจกรรม</Link>
      </Container>
    );
  }

  const eventStartDate = new Date(event.start);
  
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>กิจกรรม</Breadcrumb.Item>
            <Breadcrumb.Item active>{event.title}</Breadcrumb.Item>
          </Breadcrumb>
          
          <h1 className="display-5 fw-bold mt-3">{event.title}</h1>
          <p className="text-muted mb-4">
            วันที่จัดกิจกรรม: {eventStartDate.toLocaleDateString('th-TH', { dateStyle: 'full' })}
          </p>

          <Image src={event.fullImageUrl} fluid rounded className="mb-4 shadow-sm" />
          <div dangerouslySetInnerHTML={{ __html: event.content }} />
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetailPage;