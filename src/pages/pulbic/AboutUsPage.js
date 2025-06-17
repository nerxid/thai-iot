import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Bullseye, Binoculars, Gem, PeopleFill, Building, Compass, PuzzleFill } from 'react-bootstrap-icons';
import a1 from '../../assets/images/About/a1.png'


const AboutUsPage = () => {

    
    const styles = {
        pageHeader: {
            backgroundColor: '#EFF6FF',
            padding: '80px 0',
            textAlign: 'center',
        },
        headerTitle: {
            fontWeight: 'bold',
            fontSize: '3.5rem',
            color: '#1e3a8a',
        },
        section: {
            padding: '80px 0',
        },
        sectionTitle: {
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '1rem',
        },
        subTitle: {
            color: '#3B82F6',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            textTransform: 'uppercase', 
        },
        card: {
            border: 'none',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            backgroundColor: 'white',
        },
        imageGridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
        },
        gridImage: {
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '15px',
        },
        
        missionRow: {
            marginBottom: '80px',
        },
        missionContent: {
            padding: '2rem',
        },
        missionIcon: {
            fontSize: '3rem',
            color: '#3B82F6',
            marginBottom: '1rem',
            display: 'inline-block',
            padding: '15px',
            backgroundColor: '#EFF6FF',
            borderRadius: '15px'
        },
        missionImage: {
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            width: '100%',
            height: '350px',
            objectFit: 'cover',
        },
    };

    // --- คอมโพเนนต์ส่วนหัวของหน้า ---
    const PageHeader = () => (
        <div style={styles.pageHeader}>
            <Container>
                <h1 style={styles.headerTitle}>เกี่ยวกับสมาคมไทยไอโอที</h1>
                
            </Container>
        </div>
    );

    // --- คอมโพเนนต์ส่วนแนะนำสมาคม ---
    const AssociationInfo = () => (
        <section style={styles.section}>
            <Container>
                <Row className="align-items-center g-5">
                    <Col lg={6}>
                        <div style={styles.imageGridContainer}>
                            <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/01-10-1024x576.jpg" style={styles.gridImage} />
                            <Image src="https://www.thaiiot.org/wp-content/uploads/2024/10/001-2-1024x576.jpg" style={styles.gridImage} />
                            <Image src="https://www.thaiiot.org/wp-content/uploads/2022/09/90525189.jpg" style={styles.gridImage} />
                            <Image src="https://www.thaiiot.org/wp-content/uploads/2024/04/01-13.jpg" style={styles.gridImage} />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Card style={styles.card}>
                            <h2 style={styles.sectionTitle}>สมาคมไทยไอโอที</h2>
                            <p className="text-muted">
                                สมาคมจดทะเบียนเมื่อเดือนกุมภาพันธ์ 2561 ก่อตั้งโดย กลุ่มผู้ประกอบการและผู้บริหารชมรม RFID Thailand ซึ่งเล็ง เห็นความสําคัญของ Internet of things (IoT) ที่จะเป็น เทคโนโลยีสําคัญที่เข้ามาปฏิวัติสังคมและอุตสาหกรรมต่าง ๆ (ร่วมกับ 5G, AI, Big Data, Robotic & Automation, Machine Learning, AR&VR)
                            </p>
                            <p className="text-muted">
                                สมาคมไทยไอโอที เป็นองค์กรที่ไม่มุ่งแสวงหาผลกําไร เป็นองค์กรที่รวมตัวกันของมืออาชีพ ผู้เชี่ยวชาญ และผู้สนใจ ในเทคโนโลยี Internet of Things เพื่อเป็นศูนย์กลางเกี่ยว กับเทคโนโลยี Internet of Things ในประเทศไทย ตลอดระยะ เวลาที่ผ่านมา สมาคมไทยไอโอที ได้ดําเนินงานจนเป็นที่ยอมรับ ว่า สมาคมมีส่วนช่วยเหลือสังคมและอุตสาหกรรมต่าง ๆ ใน ประเทศไทย ให้ได้รับประโยชน์จากเทคโนโลยี IoT
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );

   
    const VisionSection = () => (
        <section style={{ ...styles.section, backgroundColor: '#EFF6FF' }}>
            <Container>
                <Row className="align-items-center g-5">
                    <Col lg={6} className="order-lg-2">
                        <Image src={a1} fluid style={{ borderRadius: '20px' }} />
                    </Col>
                    <Col lg={6} className="order-lg-1">
                        <h6 style={styles.subTitle}>VISION</h6>
                        <h2 style={styles.sectionTitle}>วิสัยทัศน์ของเรา</h2>
                        <p className="lead">
                            "เป็นสมาคมที่ช่วยให้อุตสาหกรรมที่
                        </p>
                         <p className="lead">
                            ได้รับประโยชน์จากเทคโนโลยี Intermet of Things"
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );

 
    const MissionSection = () => {
        const missions = [
            {
                icon: <Building style={styles.missionIcon} />,
                title: "เชื่อมโยงหน่วยงานอื่นๆที่เกี่ยวข้องกับ IoT",
                description: "เชื่อมโยงหน่วยงานภาครัฐ เอกชน และสถาบันการศึกษา เพื่อสร้างเครือข่ายความร่วมมือในการพัฒนาเทคโนโลยี IoT ในประเทศไทย",
                description: "ส่งเสริมและสนับสนุนการประกอบวิสาหกิจที่เกี่ยวกับ Internet of Things (IoT) และอุตสาหกรรมดิจิทัลที่เกี่ยวข้อง เพื่อเพิ่มขีดความสามารถในการแข่งขันของผู้ประกอบการไทย",
                imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/00.jpg",
                align: "left"
            },
            {
                icon: <PeopleFill style={styles.missionIcon} />,
                title: "สนับสนุนและร่วมสร้างหลักสูตร บุคลากรทางด้าน IoT",
                description: "พัฒนาหลักสูตรการศึกษาและฝึกอบรมที่เกี่ยวข้องกับ IoT เพื่อสร้างบุคลากรที่มีความรู้และทักษะในการพัฒนาเทคโนโลยี IoT",
                imageUrl: "https://www.thaiiot.org/wp-content/uploads/2022/09/0015.jpg",
                align: "right"
            },
            {
                icon: <Compass style={styles.missionIcon} />,
                title: "ส่งเสริมการใช้งาน เผยแพร่ประโยชน์ของ IoT",
                description: "ส่งเสริมการใช้งาน IoT ในภาคอุตสาหกรรมและสังคม โดยเผยแพร่ข้อมูล ข่าวสาร และความรู้เกี่ยวกับเทคโนโลยี IoT",
                imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/05/001-5-1024x576.jpg",
                align: "left"
            },
            {
                icon: <PuzzleFill style={styles.missionIcon} />,
                title: "ร่วมสร้างชุมชนของ IoT ในประเทศไทยเพื่อให้ทุกฝ่ายได้ประโยชน์สูงสุด",
                description: "สร้างประโยชน์แต่ละฝ่ายให้ได้สูงสุด",
                imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/10/001-2-1024x576.jpg",
                align: "right"
            }
        ];

        return (
            <section style={{...styles.section, paddingTop: '60px'}}>
                <Container>
                    <div className="text-center mb-5">
                        <h6 style={styles.subTitle}>Our Missions</h6>
                        <h2 style={{...styles.sectionTitle, textAlign: 'center'}}>พันธกิจหลัก 4 ด้าน</h2>
                    </div>

                    {missions.map((mission, index) => (
                        <Row key={index} className="align-items-center" style={styles.missionRow}>
                            <Col lg={6} className={mission.align === 'right' ? 'order-lg-2' : ''}>
                                <Image src={mission.imageUrl} style={styles.missionImage} fluid />
                            </Col>
                            <Col lg={6} style={styles.missionContent} className={mission.align === 'right' ? 'order-lg-1' : ''}>
                                {mission.icon}
                                <h3 className="fw-bold mb-3">{mission.title}</h3>
                                <p className="text-muted">{mission.description}</p>
                            </Col>
                        </Row>
                    ))}
                </Container>
            </section>
        );
    };

    return (
        <div>
            <PageHeader />
            <AssociationInfo />
            <VisionSection />
            <MissionSection />
        </div>
    );
};

export default AboutUsPage;