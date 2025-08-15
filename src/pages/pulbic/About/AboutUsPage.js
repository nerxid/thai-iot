import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { PeopleFill, Building, Compass, PuzzleFill } from 'react-bootstrap-icons';
import a1 from '../../../assets/images/About/a1.png';
import axios from 'axios';
import './AboutUsPage.css';

const AboutUsPage = () => {

    const [missions, setMissions] = useState([]);
    const [missionImages, setMissionImages] = useState([]);
    const [about, setAbout] = useState(null);
    const [aboutImages, setAboutImages] = useState([]);
    const [vision, setVision] = useState(null);
    const [missionsData, setMissionsData] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลเกี่ยวกับสมาคม
        axios.get('http://localhost:8000/api/association/about/')
            .then(res => {
                setAbout(res.data);
            })
            .catch(err => console.error(err));

        // ดึงรูปเกี่ยวกับสมาคม
        axios.get('http://localhost:8000/api/association/about/images/')
            .then(res => {
                // เรียงตาม display_order และเลือก 4 รูปแรก
                const sorted = [...res.data].sort((a, b) => a.display_order - b.display_order).slice(0, 4);
                setAboutImages(sorted);
            })
            .catch(err => console.error(err));

        // ดึงข้อมูลวิสัยทัศน์
        axios.get('http://localhost:8000/api/association/association/vision/')
            .then(res => {
                setVision(res.data);
            })
            .catch(err => console.error(err));

        // ดึงข้อมูลพันธกิจ
        axios.get('http://localhost:8000/api/association/association-missions/')
            .then(res => {
                const sorted = [...res.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setMissions(sorted.slice(0, 4).reverse());
            })
            .catch(err => console.error(err));

        // ดึงรูปพันธกิจ
        axios.get('http://localhost:8000/api/association/mission-images/')
            .then(res => {
                const sorted = [...res.data].sort((a, b) => a.display_order - b.display_order);
                setMissionImages(sorted);
            }) 
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8000/api/association/association-missions/'),
            axios.get('http://localhost:8000/api/association/mission-images/')
        ]).then(([missionsRes, imagesRes]) => {
            // สำหรับ mission_index 1-4 ให้เลือก mission ที่ id สูงสุดในแต่ละกลุ่ม
            const missionsByIndex = [1,2,3,4].map(idx => {
                const group = missionsRes.data.filter(m => m.mission_index === idx);
                if (group.length === 0) return null;
                return group.reduce((max, cur) => cur.id > max.id ? cur : max, group[0]);
            });
            // mapping รูปภาพตาม display_order (id สูงสุด)
            const imagesByOrder = [0,1,2,3].map(order => {
                const imgs = imagesRes.data.filter(img => img.display_order === order);
                if (imgs.length === 0) return null;
                return imgs.reduce((max, cur) => cur.id > max.id ? cur : max, imgs[0]);
            });
            // สร้าง missionsWithImages โดย mapping mission_index กับ display_order
            const missionsWithImages = missionsByIndex.map((mission, idx) => {
                if (!mission) return { title: '', description: '', imageUrl: '' };
                const img = imagesByOrder[idx];
                let imgUrl = img?.image;
                if (imgUrl && !imgUrl.startsWith('http')) {
                    imgUrl = `http://localhost:8000${imgUrl}`;
                }
                return { ...mission, imageUrl: imgUrl || '' };
            });
            setMissionsData(missionsWithImages);
        }).catch(err => console.error('Error fetching missions/images:', err));
    }, []);

    return (
        <div className="about-us-page">
            <header className="about-page-header">
                <Container>
                    <h1 className="header-title">เกี่ยวกับสมาคมไทยไอโอที</h1>
                </Container>
            </header>

            <section className="section">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <div className="image-grid-container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                                {Array(4).fill().map((_, idx) => {
                                    const img = aboutImages[idx];
                                    let imgUrl = img?.image;
                                    if (imgUrl && !imgUrl.startsWith('http')) {
                                        imgUrl = `http://localhost:8000${imgUrl}`;
                                    }
                                    return imgUrl ? (
                                        <Image key={img?.id || idx} src={imgUrl} className="grid-image" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'16px'}} />
                                    ) : (
                                        <div key={idx} style={{width:'100%',height:'140px',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'16px'}}>
                                            <span style={{color:'#bbb'}}>ไม่มีรูปภาพ</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col lg={6}>
                            <Card className="info-card">
                                <h2 className="section-title">{about?.title || 'สมาคมไทยไอโอที'}</h2>
                                <p className="text-muted">{about?.description || '...'}</p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section vision-section">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6} className="order-lg-2">
                                {vision?.image ? (
                                    <Image 
                                        src={vision.image.startsWith('http') ? vision.image : `http://localhost:8000${vision.image}`}
                                        fluid 
                                        className="vision-image" 
                                    />
                                ) : (
                                    <div style={{width:'100%',height:'180px',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'16px'}}>
                                        <span style={{color:'#bbb'}}>ไม่มีรูปภาพ</span>
                                    </div>
                                )}
                        </Col>
                        <Col lg={6} className="order-lg-1">
                            <h6 className="section-subtitle">VISION</h6>
                            <h2 className="section-title">{vision?.title || 'วิสัยทัศน์ของเรา'}</h2>
                            <p className="lead text-primary">{vision?.description || '...'}</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section className="section">
                <Container>
                    <div className="text-center mb-5 pb-3">
                        <h6 className="section-subtitle">Our Missions</h6>
                        <h2 className="section-title text-center">พันธกิจหลัก 4 ด้าน</h2>
                    </div>
                    {missionsData.map((mission, index) => {
                        const icons = [<Building className="mission-icon" />, <PeopleFill className="mission-icon" />, <Compass className="mission-icon" />, <PuzzleFill className="mission-icon" />];
                        const isReversedOnDesktop = (index % 2) === 1;
                        return (
                            <Row key={mission.id || index} className="align-items-center mission-row g-5">
                                <Col lg={6} className={isReversedOnDesktop ? 'order-lg-2' : ''}>
                                    {mission.imageUrl ? (
                                        <Image src={mission.imageUrl} className="mission-image" fluid />
                                    ) : (
                                        <div style={{width:'100%',height:'180px',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'16px'}}>
                                            <span style={{color:'#bbb'}}>ไม่มีรูปภาพ</span>
                                        </div>
                                    )}
                                </Col>
                                <Col lg={6} className={`mission-content ${isReversedOnDesktop ? 'order-lg-1' : ''}`}>
                                    {icons[index]}
                                    <h3 className="fw-bold mb-3">{mission.title}</h3>
                                    <p className="text-muted">{mission.description}</p>
                                </Col>
                            </Row>
                        );
                    })}
                </Container>
            </section>
        </div>
    );
};

export default AboutUsPage;