import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PersonCard from '../../../components/PersonCard';
import './CommitteePage.css';

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

    const renderTier = (tier) => committeeData.filter(p => p.tier === tier);

    return (
        <div className="committee-page-container">
            <header className="committee-page-header">
                <Container>
                    <h1 className="header-title">คณะกรรมการสมาคมไทยไอโอที</h1>
                    <p className="lead text-secondary">วาระปี 2567 - 2569</p>
                </Container>
            </header>
            
            <Container>
                <div className="tier-group">
                    <Row className="justify-content-center">
                        <Col lg={4} md={6} sm={8} xs={10}>
                            <PersonCard person={renderTier(1)[0]} />
                        </Col>
                    </Row>
                </div>
                
                <hr className="tier-divider" />

                <div className="tier-group">
                    <Row className="justify-content-center g-4">
                        {renderTier(2).map((person, index) => (
                            <Col lg={4} md={6} key={index}>
                                <PersonCard person={person} />
                            </Col>
                        ))}
                    </Row>
                </div>

                <div className="tier-group">
                    <Row className="g-4">
                        {committeeData.filter(p => p.tier >= 3).map((person, index) => (
                            <Col lg={4} md={6} key={index} className="d-flex align-items-stretch">
                                <PersonCard person={person} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default CommitteePage;