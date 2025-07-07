import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Badge, Pagination, InputGroup } from 'react-bootstrap'; // เพิ่ม InputGroup
import { BsDownload, BsUpload, BsCaretRightFill, BsSaveFill } from 'react-icons/bs';
import { mockBackupHistory } from '../../../data/mock-backup-history';
import './DataBackup.css';

const DataBackupPage = () => {
    const [schedule, setSchedule] = useState('weekly');
    const [selection, setSelection] = useState({
        settings: true, news: true, members: true, admins: true
    });
    const [history] = useState(mockBackupHistory);
    const [restoreFile, setRestoreFile] = useState(null);

    const handleSelectionChange = (e) => {
        const { name, checked } = e.target;
        setSelection(prev => ({ ...prev, [name]: checked }));
    };

    const handleSelectAll = (e) => {
        const { checked } = e.target;
        setSelection({ settings: checked, news: checked, members: checked, admins: checked });
    };
    
    const allChecked = Object.values(selection).every(Boolean);

    return (
        <Container fluid className="data-backup-page">
            <h2 className="page-title">การสำรองข้อมูล</h2>

            <div className="backup-container">
                <Row>
                    <Col lg={7}>
                        <div className="backup-section">
                            <h5 className="section-title">ตั้งเวลา Backup อัตโนมัติ</h5>
                            <Form.Group className="d-flex flex-wrap gap-4 mt-3">
                                <Form.Check type="radio" id="daily" name="schedule" value="daily" label="รายวัน" checked={schedule === 'daily'} onChange={e => setSchedule(e.target.value)} />
                                <Form.Check type="radio" id="weekly" name="schedule" value="weekly" label="รายสัปดาห์" checked={schedule === 'weekly'} onChange={e => setSchedule(e.target.value)} />
                                <Form.Check type="radio" id="monthly" name="schedule" value="monthly" label="รายเดือน" checked={schedule === 'monthly'} onChange={e => setSchedule(e.target.value)} />
                            </Form.Group>
                        </div>

                        <div className="backup-section">
                            <h5 className="section-title">ตัวเลือก Backup ด้วยตนเอง</h5>
                            <Form.Group className="d-flex flex-wrap gap-4 mt-3">
                                <Form.Check type="checkbox" id="all" label="ทั้งหมด" checked={allChecked} onChange={handleSelectAll} />
                                <Form.Check type="checkbox" name="settings" id="settings" label="การตั้งค่าระบบ" checked={selection.settings} onChange={handleSelectionChange} />
                                <Form.Check type="checkbox" name="news" id="news" label="ข่าว/กิจกรรม" checked={selection.news} onChange={handleSelectionChange} />
                                <Form.Check type="checkbox" name="members" id="members" label="ข้อมูลสมาชิก" checked={selection.members} onChange={handleSelectionChange} />
                                <Form.Check type="checkbox" name="admins" id="admins" label="ข้อมูล Admin" checked={selection.admins} onChange={handleSelectionChange} />
                            </Form.Group>
                        </div>
                    </Col>
                    
                    <Col lg={5}>
                        <div className="backup-section backup-actions">
                            <h5 className="section-title">คำสั่ง</h5>
                            <div className="d-grid gap-2 mt-3">
                                <Button variant="primary"><BsSaveFill className="me-2"/>สำรองข้อมูลตอนนี้</Button>
                                <Button variant="outline-secondary"><BsDownload className="me-2"/>ดาวน์โหลดไฟล์ล่าสุด</Button>
                            </div>
                            
                            <hr className="my-4"/>

                            <h6 className="restore-title">กู้คืนข้อมูลจากไฟล์</h6>
                            <InputGroup className="mt-2">
                                <Form.Control
                                    placeholder={restoreFile ? restoreFile.name : "ยังไม่ได้เลือกไฟล์"}
                                    aria-label="Restore file name"
                                    readOnly
                                />
                                <Button as="label" htmlFor="restore-file-upload" variant="outline-primary" className="choose-file-btn">
                                    <BsUpload className="me-1"/> Choose File
                                </Button>
                                <Form.Control id="restore-file-upload" type="file" onChange={(e) => setRestoreFile(e.target.files[0])} hidden />
                            </InputGroup>

                            <div className="d-grid mt-2">
                                <Button variant="warning" disabled={!restoreFile}>
                                    <BsCaretRightFill className="me-2"/>เริ่มกู้คืนข้อมูล
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="backup-container mt-4">
                 <h5 className="section-title mb-3">ประวัติการสำรองข้อมูล</h5>
                <Table responsive hover className="backup-history-table">
                    <thead><tr><th>วันที่</th><th>เวลา</th><th>ประเภทการสำรองข้อมูล</th><th>สถานะ</th></tr></thead>
                    <tbody>
                        {history.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.type}</td>
                                <td><Badge pill bg={item.status === 'สำเร็จ' ? 'success' : 'danger'} className="status-badge">{item.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

export default DataBackupPage;