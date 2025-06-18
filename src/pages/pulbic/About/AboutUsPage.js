import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { PeopleFill, Building, Compass, PuzzleFill } from 'react-bootstrap-icons';
import a1 from '../../../assets/images/About/a1.png';
import './AboutUsPage.css';

const AboutUsPage = () => {

    const missions = [
        {
            icon: <Building className="mission-icon" />,
            title: "เชื่อมโยงหน่วยงานอื่นๆที่เกี่ยวข้องกับ IoT",
            description: "ส่งเสริมและสนับสนุนการประกอบวิสาหกิจที่เกี่ยวกับ Internet of Things (IoT) และอุตสาหกรรมดิจิทัลที่เกี่ยวข้อง เพื่อเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการไทย และเชื่อมโยงหน่วยงานภาครัฐ เอกชน และสถาบันการศึกษา",
            imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg",
            align: "left"
        },
        {
            icon: <PeopleFill className="mission-icon" />,
            title: "สนับสนุนและร่วมสร้างหลักสูตร บุคลากรทางด้าน IoT",
            description: "พัฒนาหลักสูตรการศึกษาและฝึกอบรมที่เกี่ยวข้องกับ IoT เพื่อสร้างบุคลากรที่มีความรู้และทักษะในการพัฒนาเทคโนโลยี IoT",
            imageUrl: "https://www.thaiiot.org/wp-content/uploads/2022/09/0015.jpg",
            align: "right"
        },
        {
            icon: <Compass className="mission-icon" />,
            title: "ส่งเสริมการใช้งาน เผยแพร่ประโยชน์ของ IoT",
            description: "ส่งเสริมการใช้งาน IoT ในภาคอุตสาหกรรมและสังคม โดยเผยแพร่ข้อมูล ข่าวสาร และความรู้เกี่ยวกับเทคโนโลยี IoT",
            imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg",
            align: "left"
        },
        {
            icon: <PuzzleFill className="mission-icon" />,
            title: "ร่วมสร้างชุมชนของ IoT ในประเทศไทย",
            description: "สร้างชุมชน IoT ในประเทศไทยเพื่อให้ทุกฝ่ายได้ประโยชน์สูงสุด และเป็นศูนย์กลางในการแลกเปลี่ยนความรู้และประสบการณ์",
            imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/10/001-2-1024x576.jpg",
            align: "right"
        }
    ];

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
                            <div className="image-grid-container">
                                <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/01-10-1024x576.jpg" className="grid-image" />
                                <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/001-2-1024x576.jpg" className="grid-image" />
                                <Image src="https://www.thaiiot.org/wp-content/uploads/2022/09/90525189.jpg" className="grid-image" />
                                <Image src="https://www.thaiiot.org/wp-content/uploads/2024/04/01-13.jpg" className="grid-image" />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <Card className="info-card">
                                <h2 className="section-title">สมาคมไทยไอโอที</h2>
                                <p className="text-muted">
                                    สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand ซึ่งเล็ง เห็นความสําคัญของ Internet of things (IoT) ที่จะเป็น เทคโนโลยีสําคัญที่เข้ามาปฏิวัติสังคมและอุตสาหกรรมต่าง ๆ
                                </p>
                                <p className="text-muted">
                                    สมาคมไทยไอโอที เป็นองค์กรที่ไม่มุ่งแสวงหาผลกําไร เป็นองค์กรที่รวมตัวกันของมืออาชีพ ผู้เชี่ยวชาญ และผู้สนใจ ในเทคโนโลยี Internet of Things เพื่อเป็นศูนย์กลางเกี่ยว กับเทคโนโลยี Internet of Things ในประเทศไทย
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section vision-section">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6} className="order-lg-2">
                            <Image src={a1} fluid className="vision-image" />
                        </Col>
                        <Col lg={6} className="order-lg-1">
                            <h6 className="section-subtitle">VISION</h6>
                            <h2 className="section-title">วิสัยทัศน์ของเรา</h2>
                            <p className="lead text-primary">
                                "เป็นสมาคมที่ช่วยให้อุตสาหกรรมที่ได้รับประโยชน์จากเทคโนโลยี Internet of Things"
                            </p>
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
                    {missions.map((mission, index) => {
                        const isReversedOnDesktop = mission.align === 'right';
                        return (
                            <Row key={index} className="align-items-center mission-row g-5">
                                <Col lg={6} className={isReversedOnDesktop ? 'order-lg-2' : ''}>
                                    <Image src={mission.imageUrl} className="mission-image" fluid />
                                </Col>
                                <Col lg={6} className={`mission-content ${isReversedOnDesktop ? 'order-lg-1' : ''}`}>
                                    {mission.icon}
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