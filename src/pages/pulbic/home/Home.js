import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Image } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import './HomePage.css'; 

import bannerImage from '../../../assets/images/Logo/8.png';
import { newsData } from '../../../data/mock-news';
import { rawEventsData } from '../../../data/mock-events';
import P1 from '../../../assets/images/Poster/P1.jpg';
import P2 from '../../../assets/images/Poster/P2.jpg';
import P3 from '../../../assets/images/Poster/P3.jpg';

const AssociationHomePage = () => {
    
   
    const Banner = () => (
        <div id="home" className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
            <h1 className="banner-title">THAIIOT<br />Association</h1>
            <p className="lead my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor<br />incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );

    const AssociationIntro = () => (
        <section id="about" className="section-lightblue">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/01-10-1024x576.jpg" fluid className="intro-image" />
                    </Col>
                    <Col md={6} className="intro-text-col">
                        <h2 className="fw-bold display-5 mb-3">เกี่ยวกับสมาคม</h2>
                        <p className="text-muted lead my-3">
                            สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand ซึ่งเล็ง เห็นความสําคัญของ Internet of things (IoT) ที่จะเป็น เทคโนโลยีสําคัญที่เข้ามาปฏิวัติสังคมและอุตสาหกรรมต่าง ๆ...
                        </p>
                        <Button variant="outline-primary" href="/about" className="outline-rounded-button">เกี่ยวกับเราเพิ่มเติม <ChevronRight /></Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );

    const PosterCarousel = () => (
        <section id="poster" className="section">
            <Container>
                <h2 className="section-title" style={{ justifyContent: 'center', borderBottom: 'none' }}>POSTER</h2>
                <div className="carousel-container">
                    <Carousel indicators={false}>
                        <Carousel.Item><img className="carousel-image" src={P1} alt="First slide" /></Carousel.Item>
                        <Carousel.Item><img className="carousel-image" src={P2} alt="Second slide" /></Carousel.Item>
                        <Carousel.Item><img className="carousel-image" src={P3} alt="Third slide" /></Carousel.Item>
                    </Carousel>
                </div>
            </Container>
        </section>
    );

    const NewsSection = () => (
        <section id="news" className="section-lightblue">
            <Container>
                <div className="section-title">
                    <h2 className="fw-bold mb-0">ข่าวสารล่าสุด</h2>
                    <Link to="/news" className="view-more-link">ดูทั้งหมด <ChevronRight /></Link>
                </div>
                <Row>
                    {newsData.slice(0, 3).map((newsItem) => (
                        <Col md={4} key={newsItem.id} className="mb-4">
                            <Card className="news-card">
                                <Card.Img variant="top" src={newsItem.imageUrl} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold flex-grow-1">{newsItem.title}</Card.Title>
                                    <Card.Text className="text-muted small mt-2">{newsItem.date}</Card.Text>
                                    <Link to={`/news/${newsItem.id}`} className="card-link mt-3">อ่านเพิ่มเติม...</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );

    const ActivitiesSection = () => (
        <section id="activities" className="section">
            <Container>
                <div className="section-title">
                    <h2 className="fw-bold mb-0">กิจกรรมที่กำลังจะมาถึง</h2>
                    <Link to="/events" className="view-more-link">ดูทั้งหมด <ChevronRight /></Link>
                </div>
                <Row>
                    {rawEventsData.slice(0, 3).map((event) => (
                        <Col md={4} key={event.id} className="mb-4">
                            <Card className="news-card">
                                <Card.Img variant="top" src={event.imageUrl} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold flex-grow-1">{event.title}</Card.Title>
                                    <Card.Text className="text-muted small mt-2">
                                        {new Date(event.start).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                                    </Card.Text>
                                    <Link to={`/events/${event.id}`} className="card-link mt-3">ดูรายละเอียด...</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );

    return (
        <div>
            <main>
                <Banner />
                <AssociationIntro />
                <PosterCarousel />
                <NewsSection />
                <ActivitiesSection />
            </main>
        </div>
    );
};

export default AssociationHomePage;