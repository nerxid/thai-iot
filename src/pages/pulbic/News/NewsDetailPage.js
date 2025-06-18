import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Breadcrumb, Card } from 'react-bootstrap';
import { newsData } from '../../../data/mock-news';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
    const { newsId } = useParams();
    const article = newsData.find(item => item.id.toString() === newsId);

    if (!article) {
        return (
            <Container className="my-5 text-center">
                <h2>404 - ไม่พบข่าวสาร</h2>
                <p>ขออภัย ไม่พบข่าวที่คุณกำลังค้นหา</p>
                <Link to="/news" className="btn btn-primary">กลับสู่หน้ารวมข่าวสาร</Link>
            </Container>
        );
    }

    const otherNews = newsData.filter(item => item.id.toString() !== newsId).slice(0, 3);

    return (
        <div className="news-detail-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className="article-container">
                            <Breadcrumb className="article-breadcrumb">
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าแรก</Breadcrumb.Item>
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/news" }}>ข่าวสาร</Breadcrumb.Item>
                                <Breadcrumb.Item active>{article.title}</Breadcrumb.Item>
                            </Breadcrumb>
                            
                            <header className="article-header">
                                <h1 className="article-title">{article.title}</h1>
                                <p className="article-meta">เผยแพร่เมื่อ: {article.date}</p>
                            </header>

                            <Image src={article.fullImageUrl} fluid rounded className="mb-4 shadow-sm article-image" />

                            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>

                        {otherNews.length > 0 && (
                            <div className="related-news-section">
                                <h3 className="related-news-title">ข่าวสารอื่นๆ ที่น่าสนใจ</h3>
                                <Row>
                                    {otherNews.map(item => (
                                        <Col md={4} key={item.id} className="mb-3">
                                            <Card className="h-100 border-0 shadow-sm related-news-card">
                                                <Card.Img variant="top" src={item.imageUrl} />
                                                <Card.Body>
                                                    <Card.Title className="related-card-title">{item.title}</Card.Title>
                                                    <Link to={`/news/${item.id}`} className="stretched-link">อ่านต่อ</Link>
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

export default NewsDetailPage;