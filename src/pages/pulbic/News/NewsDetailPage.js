import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Breadcrumb } from 'react-bootstrap';
import { newsData } from '../../../data/mock-news';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const article = newsData.find(item => item.id.toString() === newsId);

  if (!article) {
    return (
      <Container className="my-5 text-center">
        <h2>404 - ไม่พบข่าวสาร</h2>
        <p>ขออภัย ไม่พบข่าวที่คุณกำลังค้นหา</p>
        <Link to="/news">กลับไปที่หน้ารายการข่าว</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/news" }}>ข่าวสาร</Breadcrumb.Item>
            <Breadcrumb.Item active>{article.title}</Breadcrumb.Item>
          </Breadcrumb>
          
          <h1 className="display-5 fw-bold mt-3">{article.title}</h1>
          <p className="text-muted mb-4">เผยแพร่เมื่อ: {article.date}</p>

          <Image src={article.fullImageUrl} fluid rounded className="mb-4 shadow-sm" />

          <div dangerouslySetInnerHTML={{ __html: article.content }} />

        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetailPage;