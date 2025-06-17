import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PersonCard from '../../components/PersonCard';

const CommitteePage = () => {

    const committeeData = [
        { name: "ดร.สุทัด ครองชนม์", title: "นายกสมาคม", tier: 1, imageUrl: "https://www.thaiiot.org/wp-content/uploads/elementor/thumbs/S__9773340-ql92394o1pih74r2dxhe1inm5vlj02gcl6h7nsce2o.jpg" },
        { name: "นายเขมรัฐ โชคมั่งมี", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534938.jpg" },
        { name: "นายอภิรัตน์ หวานชะเอม", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534943.jpg" },
        { name: "นายชาญศิลป์ ม้าทอง", title: "อุปนายกสมาคม", tier: 2, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453051.jpg" },
        { name: "ว่าที่ รต.อาคม ไทยเจริญ", title: "เลขาธิการสมาคม", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453045.jpg" },
        { name: "นายการุณ หงษ์สืบชาติ", title: "กรรมการบริหารและเหรัญญิก", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453052.jpg" },
        { name: "นายธีรพัฒน์ ทองสุโชติ", title: "กรรมการบริหารและสาราณียกร", tier: 3, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453047.jpg" },
        { name: "นายเทวัน ส่งเสริมสกุลสุข", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453050.jpg" },
        { name: "ผศ.ดร.พงศ์ศรัณย์ บุญโญปกรณ์", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534941.jpg" },
        { name: "ดร.สุรชัย ทองแก้ว", title: "กรรมการบริหารและวิชาการ", tier: 4, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534940.jpg" },
        { name: "ดร.วโรดม คำแผ่นชัย", title: "กรรมการบริหารและพัฒนาเครือข่าย", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10534948.jpg" },
        { name: "นายไทเยนทร์ รัตนวิจารณ์", title: "กรรมการบริหารและพัฒนาเครือข่าย", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453049.jpg" },
        { name: "นายธนัทเมศร์ โชติกีรติศาสตร์", title: "กรรมการบริหารและประชาสัมพันธ์", tier: 5, imageUrl: "https://www.thaiiot.org/wp-content/uploads/2024/03/S__10453048.jpg" },
    ];

    const styles = {
        pageHeader: {
            backgroundColor: '#EFF6FF',
            padding: '80px 0',
            textAlign: 'center',
            marginBottom: '60px',
        },
        headerTitle: {
            fontWeight: 'bold',
            fontSize: '3.5rem',
            color: '#1e3a8a',
        },
    };
    

    return (
        <div style={{ paddingBottom: '60px' }}>
            <div style={styles.pageHeader}>
                <Container>
                    <h1 style={styles.headerTitle}>คณะกรรมการสมาคมไทยไอโอที</h1>
                    <p className="lead text-muted">
                        วาระปี 2567 - 2569
                    </p>
                </Container>
            </div>
            
            <Container>
                {/* --- Tier 1: นายกสมาคม --- */}
                <Row className="justify-content-center mb-5">
                    <Col lg={4} md={6}>
                        <PersonCard person={committeeData.find(p => p.tier === 1)} />
                    </Col>
                </Row>
                
                <hr className="my-5" />

                {/* --- Tier 2: อุปนายกสมาคม --- */}
                <Row className="justify-content-center g-4 mb-5">
                    {committeeData.filter(p => p.tier === 2).map((person, index) => (
                        <Col lg={4} md={6} key={index}>
                            <PersonCard person={person} />
                        </Col>
                    ))}
                </Row>

                {/* --- Tier 3-5: กรรมการบริหาร --- */}
                <Row className="g-4">
                    {committeeData.filter(p => p.tier >= 3).map((person, index) => (
                        <Col lg={4} md={6} key={index} className="mb-4">
                            <PersonCard person={person} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default CommitteePage;