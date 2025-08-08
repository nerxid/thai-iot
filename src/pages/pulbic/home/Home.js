import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Carousel,
  Image,
} from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const AssociationHomePage = () => {
  const [banners, setBanners] = useState([]);
  const [intro, setIntro] = useState([]);
  const [poster, setPoster] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mediahub/posters/"
        );
        setPoster(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching poster:", err);
        setError("เกิดข้อผิดพลาดในการโหลดแบนเนอร์");
      }
    };
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mediahub/banners/"
        );
        setBanners(response.data[0].image);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("เกิดข้อผิดพลาดในการโหลดแบนเนอร์");
      }
    };

    const fetchIntro = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mediahub/IntroUpload"
        );
        setIntro(response.data);
        console.log("Intro loaded:", response.data);
      } catch (err) {
        console.error("Error fetching Intro:", err);
        setError("เกิดข้อผิดพลาดในการโหลดแบนเนอร์");
      }
    };
    fetchBanners();
    fetchIntro();
    fetchPoster();
  }, []);

  const Banner = () => (
    <div
      id="home"
      className="banner"
      style={{ backgroundImage: `url(${banners})` }}
    >
      <h1 className="banner-title">
        THAI IoT
        <br />
        Association
      </h1>
      <p className="lead my-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor
        <br />
        incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );

  const AssociationIntro = () => (
    <section id="about" className="section-lightblue">
      <Container>
        <Row>
          <Col md={6}>
            {intro && (
              <Image
                src={`http://localhost:8000${intro.file}`}
                fluid
                className="intro-image"
                alt={intro.title}
              />
            )}
          </Col>
          <Col md={6} className="intro-text-col">
            {intro && (
              <>
                <h2 className="fw-bold display-5 mb-3">{intro.title}</h2>
                <p className="text-muted lead my-3">{intro.description}</p>
              </>
            )}
            {error && <p className="text-danger">{error}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );

  const PosterCarousel = () => (
    <section id="poster" className="section">
      <Container>
        <h2
          className="section-title"
          style={{ justifyContent: "center", borderBottom: "none" }}
        >
          ประชาสัมพันธ์
        </h2>
        <div className="carousel-container">
          <Carousel indicators={false}>
            {poster.length > 0 &&
              poster[0].images.map((img, index) => (
                <Carousel.Item key={img.id}>
                  <img
                    className="carousel-image"
                    src={img.image}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );

const NewsSection = () => {
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/content/posts/');
        // กรองเฉพาะโพสต์ประเภท 'news' และเรียงตามวันที่เผยแพร่ล่าสุด
        const filteredNews = response.data
          .filter(post => post.type === 'news' && post.is_published)
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          .slice(0, 3); // เอาเพียง 3 ข่าวล่าสุด
        setNewsPosts(filteredNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข่าวสาร');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section id="news" className="section-lightblue">
        <Container>
          <div className="section-title">
            <h2 className="fw-bold mb-0">ข่าวสารล่าสุด</h2>
            <Link to="/news" className="view-more-link">
              ดูทั้งหมด <ChevronRight />
            </Link>
          </div>
          <div className="text-center py-5">กำลังโหลดข่าวสาร...</div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="section-lightblue">
        <Container>
          <div className="section-title">
            <h2 className="fw-bold mb-0">ข่าวสารล่าสุด</h2>
            <Link to="/news" className="view-more-link">
              ดูทั้งหมด <ChevronRight />
            </Link>
          </div>
          <div className="text-center py-5 text-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section id="news" className="section-lightblue">
      <Container>
        <div className="section-title">
          <h2 className="fw-bold mb-0">ข่าวสารล่าสุด</h2>
          <Link to="/news" className="view-more-link">
            ดูทั้งหมด <ChevronRight />
          </Link>
        </div>
        <Row>
          {newsPosts.length > 0 ? (
            newsPosts.map((newsItem) => (
              <Col md={4} key={newsItem.id} className="mb-4">
                <Card className="news-card">
                  {newsItem.cover_image && (
                    <Card.Img variant="top" src={newsItem.cover_image} />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold flex-grow-1">
                      {newsItem.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mt-2">
                      {new Date(newsItem.published_at).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Card.Text>
                    <Link to={`/news/${newsItem.id}`} className="card-link mt-3">
                      อ่านเพิ่มเติม...
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              ไม่มีข่าวสารในขณะนี้
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

const ActivitiesSection = () => {
  const [eventPosts, setEventPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/content/posts/');
        // กรองเฉพาะโพสต์ประเภท 'event' ที่มีการเผยแพร่ และเรียงตามวันที่เผยแพร่
        const filteredEvents = response.data
          .filter(post => post.type === 'event' && post.is_published)
          .sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
          .slice(0, 3); // เอาเพียง 3 กิจกรรมล่าสุด
        setEventPosts(filteredEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('เกิดข้อผิดพลาดในการโหลดกิจกรรม');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section id="activities" className="section">
        <Container>
          <div className="section-title">
            <h2 className="fw-bold mb-0">กิจกรรมที่กำลังจะมาถึง</h2>
            <Link to="/events" className="view-more-link">
              ดูทั้งหมด <ChevronRight />
            </Link>
          </div>
          <div className="text-center py-5">กำลังโหลดกิจกรรม...</div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section id="activities" className="section">
        <Container>
          <div className="section-title">
            <h2 className="fw-bold mb-0">กิจกรรมที่กำลังจะมาถึง</h2>
            <Link to="/events" className="view-more-link">
              ดูทั้งหมด <ChevronRight />
            </Link>
          </div>
          <div className="text-center py-5 text-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section id="activities" className="section">
      <Container>
        <div className="section-title">
          <h2 className="fw-bold mb-0">กิจกรรมที่กำลังจะมาถึง</h2>
          <Link to="/events" className="view-more-link">
            ดูทั้งหมด <ChevronRight />
          </Link>
        </div>
        <Row>
          {eventPosts.length > 0 ? (
            eventPosts.map((event) => (
              <Col md={4} key={event.id} className="mb-4">
                <Card className="news-card">
                  {event.cover_image && (
                    <Card.Img 
                      variant="top" 
                      src={event.cover_image} 
                      alt={event.title}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold flex-grow-1">
                      {event.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mt-2">
                      {new Date(event.published_at).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Card.Text>
                    <Link to={`/events/${event.id}`} className="card-link mt-3">
                      ดูรายละเอียด...
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              ไม่มีกิจกรรมในขณะนี้
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

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
