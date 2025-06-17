import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ id, title, date, src, summary }) => {
  return (
    <Link to={`/events/${id}`} className="event-card-link">
      
      <Card className="h-100 event-card">
        <Card.Img variant="top" src={src} className="event-card-img" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="card-title-custom fw-bold mb-2">{title}</Card.Title>
          <Card.Text className="text-muted small mb-3">{date}</Card.Text>
          <Card.Text className="card-summary-custom flex-grow-1">{summary}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EventCard;