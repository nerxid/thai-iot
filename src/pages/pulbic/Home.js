import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Image } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/images/Logo/8.png';
import { newsData } from '../../data/mock-news';
import { rawEventsData } from '../../data/mock-events';
import P1 from '../../assets/images/Poster/P1.jpg';
import P2 from '../../assets/images/Poster/P2.jpg';
import P3 from '../../assets/images/Poster/P3.jpg';

const AssociationHomePage = () => {

    const themeColors = {
        primaryBlue: '#3B82F6',
        lightBlueBg: '#EFF6FF',
        white: '#FFFFFF',
        textDark: '#1F2937',
        textDarkOriginal: '#333333', 
        sectionPadding: '80px 0',
    };

    const styles = {
        
        banner: {
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            color: themeColors.textDarkOriginal,
            textAlign: 'center',
            padding: '20px' 
        },
        bannerTitle: {
            fontWeight: 'bold',
            fontSize: '4.5rem',
            color: themeColors.textDarkOriginal,
            textTransform: 'uppercase',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        },
        
        
        section: {
            padding: themeColors.sectionPadding,
        },
        sectionLightBlue: {
            padding: themeColors.sectionPadding,
            backgroundColor: themeColors.lightBlueBg,
        },
        sectionTitle: {
            textAlign: 'center',
            marginBottom: '60px',
            fontWeight: 'bold',
            color: themeColors.textDark,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `2px solid ${themeColors.primaryBlue}20`,
            paddingBottom: '15px',
        },
        viewMoreLink: {
            color: themeColors.primaryBlue,
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.2s ease-in-out',
        },

        
        newsCard: {
            border: 'none',
            borderRadius: '15px', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            overflow: 'hidden',
            height: '100%',
        },
        newsCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 28px rgba(59, 130, 246, 0.15)',
        },
        cardLink: {
            textDecoration: 'none',
            color: themeColors.primaryBlue,
            fontWeight: 'bold',
        },
        roundedButton: {
            backgroundColor: themeColors.primaryBlue,
            borderColor: themeColors.primaryBlue,
            padding: '12px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px', 
            transition: 'all 0.3s ease',
        },
        outlineRoundedButton: {
            padding: '10px 28px',
            fontSize: '1.1rem',
            borderRadius: '8px', 
        },
        carouselContainer: {
            borderRadius: '20px', 
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            backgroundColor: '#f8f9fa'
        },
        carouselItem: { 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        carouselImage: {
            width: '100%',
            height: 'auto', 
            maxHeight: '70vh',
            objectFit: 'contain',
        },
        introImage: {
            borderRadius: '20px', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }
    };

    const handleMouseOver = (e) => {
        Object.assign(e.currentTarget.style, styles.newsCardHover);
    };
    const handleMouseOut = (e) => {
        Object.assign(e.currentTarget.style, styles.newsCard);
    };

    
    const Banner = () => (
        <div id="home" style={styles.banner}>
            <h1 style={styles.bannerTitle}>THAIIOT<br />Association</h1>
            <p className="lead my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor<br />incididunt ut labore et dolore magna aliqua.
            </p>
            
        </div>
    );

    const AssociationIntro = () => (
        <section id="about" style={styles.sectionLightBlue}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/01-10-1024x576.jpg" fluid style={styles.introImage} />
                    </Col>
                    <Col md={6}>
                        <h2 className="fw-bold display-5 mb-3">เกี่ยวกับสมาคม</h2>
                        <p className="text-muted lead my-3">
                            สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand ซึ่งเล็ง เห็นความสําคัญของ Internet of things (IoT) ที่จะเป็น เทคโนโลยีสําคัญที่เข้ามาปฏิวัติสังคมและอุตสาหกรรมต่าง ๆ...
                        </p>
                        <Button variant="outline-primary" href="/about"style={styles.outlineRoundedButton}>เกี่ยวกับเราเพิ่มเติม <ChevronRight /></Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );

    const PosterCarousel = () => (
        <section id="poster" style={styles.section}>
            <Container>
                <h2 style={{ ...styles.sectionTitle, justifyContent: 'center', borderBottom: 'none' }}>POSTER</h2>
                <div style={styles.carouselContainer}>
                    <Carousel indicators={false}>
                        <Carousel.Item><img style={styles.carouselImage} src={P1} alt="First slide" /></Carousel.Item>
                        <Carousel.Item><img style={styles.carouselImage} src={P2} alt="Second slide" /></Carousel.Item>
                        <Carousel.Item><img style={styles.carouselImage} src={P3} alt="Third slide" /></Carousel.Item>
                    </Carousel>
                </div>
            </Container>
        </section>
    );

    const NewsSection = () => (
        <section id="news" style={styles.sectionLightBlue}>
            <Container>
                <div style={styles.sectionTitle}>
                    <h2 className="fw-bold mb-0">ข่าวสารล่าสุด</h2>
                    <Link to="/news" style={styles.viewMoreLink}>ดูทั้งหมด <ChevronRight /></Link>
                </div>
                <Row>
                    {newsData.slice(0, 3).map((newsItem) => (
                        <Col md={4} key={newsItem.id} className="mb-4">
                            <Card style={styles.newsCard} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                <Card.Img variant="top" src={newsItem.imageUrl} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold flex-grow-1">{newsItem.title}</Card.Title>
                                    <Card.Text className="text-muted small mt-2">{newsItem.date}</Card.Text>
                                    <Link to={`/news/${newsItem.id}`} style={styles.cardLink} className="mt-3">อ่านเพิ่มเติม...</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );

    const ActivitiesSection = () => (
        <section id="activities" style={styles.section}>
            <Container>
                <div style={styles.sectionTitle}>
                    <h2 className="fw-bold mb-0">กิจกรรมที่กำลังจะมาถึง</h2>
                    <Link to="/events" style={styles.viewMoreLink}>ดูทั้งหมด <ChevronRight /></Link>
                </div>
                <Row>
                    {rawEventsData.slice(0, 3).map((event) => (
                        <Col md={4} key={event.id} className="mb-4">
                            <Card style={styles.newsCard} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                <Card.Img variant="top" src={event.imageUrl} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold flex-grow-1">{event.title}</Card.Title>
                                    <Card.Text className="text-muted small mt-2">
                                        {new Date(event.start).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                                    </Card.Text>
                                    <Link to={`/events/${event.id}`} style={styles.cardLink} className="mt-3">ดูรายละเอียด...</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );

    return (
        <div style={{backgroundColor: themeColors.white}}>
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