import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Image } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import bannerImage from '../assets/images/Logo/8.png';


const AssociationHomePage = () => {

    
    const themeColors = {
        primaryBlue: '#3B82F6',
        lightBlueBg: '#EFF6FF',
        white: '#FFFFFF',
        textDark: '#333333',
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
            alignItems: 'center',
            justifyContent: 'center',
            color: themeColors.textDark, 
            textAlign: 'center',
        },
        bannerContent: {
            padding: '30px',
        },
        bannerTitle: {
            fontWeight: 'bold',
            fontSize: '4.5rem',
            color: themeColors.textDark,
            textTransform: 'uppercase', 
        },
        primaryButton: {
            backgroundColor: themeColors.primaryBlue,
            borderColor: themeColors.primaryBlue,
            padding: '12px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
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
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '15px',
        },
        viewMoreLink: {
            color: themeColors.primaryBlue,
            textDecoration: 'none',
            fontWeight: 'normal',
            fontSize: '1rem',
        },
        newsCard: {
            border: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
        },
        carouselItem: {
            height: '500px',
        },
        carouselImage: {
            height: '100%',
            width: '100%',
            objectFit: 'contain', 
            backgroundColor: '#f8f9fa'
        },
    };


    const Banner = () => (
        
        <div id="home" style={styles.banner}>
            <div style={styles.bannerContent}>
                <h1 style={styles.bannerTitle}>THAIIOT<br/>Association</h1>
                <p className="lead my-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor<br/>incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </div>
    );
    
    const AssociationIntro = () => (
        
        <section id="about" style={styles.sectionLightBlue}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        <Image src="https://placehold.co/600x400/3B82F6/FFFFFF?text=aboutAssociation" rounded fluid />
                    </Col>
                    <Col md={6}>
                        <h2 className="fw-bold display-5">ABOUT US</h2>
                        <p className="text-muted lead my-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor<br/>incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Button variant="outline-primary">เกี่ยวกับเราเพิ่มเติม <ChevronRight /></Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );

    const PosterCarousel = () => (
        
        <section id="poster" style={styles.section}>
            <Container>
                <h2 style={{...styles.sectionTitle, justifyContent: 'center', borderBottom: 'none'}}>POSTER</h2>
                <Carousel indicators={false}>
                    <Carousel.Item style={styles.carouselItem}><img style={styles.carouselImage} src="https://placehold.co/1200x600/3B82F6/FFFFFF?text=Poster+1" alt="First slide"/></Carousel.Item>
                    <Carousel.Item style={styles.carouselItem}><img style={styles.carouselImage} src="https://placehold.co/1200x600/10B981/FFFFFF?text=Poster+2" alt="Second slide"/></Carousel.Item>
                    <Carousel.Item style={styles.carouselItem}><img style={styles.carouselImage} src="https://placehold.co/1200x600/F59E0B/FFFFFF?text=Poster+3" alt="Third slide"/></Carousel.Item>
                </Carousel>
            </Container>
        </section>
    );
    
    const NewsSection = () => (
        
        <section id="news" style={styles.sectionLightBlue}>
            <Container>
                <div style={styles.sectionTitle}><h2 className="fw-bold mb-0">NEWS</h2><a href="#news" style={styles.viewMoreLink}>ดูทั้งหมด <ChevronRight /></a></div>
                <Row>
                    {[...Array(3)].map((_, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card style={styles.newsCard}>
                                <Card.Img variant="top" src={`https://placehold.co/600x400/A5B4FC/374151?text=News+${index + 1}`} />
                                <Card.Body><Card.Title className="fw-bold">หัวข้อข่าว {index + 1}</Card.Title><Card.Text className="text-muted small">9 มิถุนายน 2568</Card.Text><a href="#read" style={styles.viewMoreLink}>อ่านเพิ่มเติม...</a></Card.Body>
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
                <div style={styles.sectionTitle}><h2 className="fw-bold mb-0">ACTIVITIES</h2><a href="#activities" style={styles.viewMoreLink}>ดูทั้งหมด <ChevronRight /></a></div>
                <Row>
                     {[...Array(3)].map((_, index) => (
                         <Col md={4} key={index} className="mb-4">
                             <Card style={styles.newsCard}>
                                 <Card.Img variant="top" src={`https://placehold.co/600x400/93C5FD/374151?text=Activity+${index + 1}`} />
                                 <Card.Body><Card.Title className="fw-bold">กิจกรรมที่ {index + 1}</Card.Title><Card.Text className="text-muted small">เร็วๆ นี้</Card.Text><a href="#read" style={styles.viewMoreLink}>ดูรายละเอียด...</a></Card.Body>
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