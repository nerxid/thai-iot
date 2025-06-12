import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NewsCard.css'; 

const NewsCard = ({ id, title, date, summary, src }) => {
  return (
    <Link to={`/news/${id}`} className="news-card-link">
      {/* [ปรับแก้] ลบ 'shadow-sm' ออกจาก className ตรงนี้ */}
      <Card className="h-100 news-card"> 
        <Card.Img variant="top" src={src} className="news-card-img" />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="card-title-custom fw-bold mb-2">{title}</Card.Title>
          <Card.Text className="text-muted small mb-3">{date}</Card.Text>
          <Card.Text className="card-summary-custom flex-grow-1">{summary}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default NewsCard;