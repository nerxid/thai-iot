import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

const ExportInboxModal = ({ show, onHide, messages }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleExport = () => {
        // กรองข้อมูลตามเงื่อนไขที่เลือก
        const filteredData = messages.filter(msg => {
            const statusMatch = selectedStatus === 'all' || msg.status === selectedStatus;
            
            // แปลงวันที่ของ message เป็น Date object เพื่อเปรียบเทียบ
            // สมมติว่ารูปแบบวันที่คือ "DD/MM/YYYY"
            const dateParts = msg.date.split('/');
            const itemDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

            const startMatch = !startDate || itemDate >= startDate;
            const endMatch = !endDate || itemDate <= endDate;

            return statusMatch && startMatch && endMatch;
        });

        if (filteredData.length === 0) {
            alert("ไม่พบข้อมูลข้อความตามเงื่อนไขที่ท่านเลือก");
            return;
        }

        // เตรียมข้อมูลสำหรับใส่ใน Excel
        const dataForExcel = filteredData.map(msg => ({
            'วันที่': msg.date,
            'สถานะ': msg.status,
            'หัวข้อ': msg.subject,
            'ชื่อผู้ส่ง': msg.senderName,
            'อีเมลผู้ส่ง': msg.senderEmail,
            'เบอร์โทรผู้ส่ง': msg.senderPhone,
            'ข้อความ': msg.message,
        }));

        // สร้างไฟล์ Excel และดาวน์โหลด
        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inbox Messages");
        
        const date = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `ThaiIoT_Inbox_Export_${date}.xlsx`);

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>ส่งออกข้อมูลข้อความติดต่อ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                     <div className="export-modal-section">
                            <Form.Label>เลือกช่วงวันที่ของข้อความ</Form.Label>
                            <Row className="g-3">
                            <Col sm={6}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="วันที่เริ่มต้น"
                                    className="form-control"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    portalId="datepicker-portal"
                                />
                            </Col>
                            <Col sm={6}>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="วันที่สิ้นสุด"
                                    className="form-control"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    portalId="datepicker-portal" 
                                />
                            </Col>

                            <Col sm={12} className="mt-2">
                                <Form.Text muted>
                                    (เว้นว่างเพื่อส่งออกข้อมูลทั้งหมดโดยไม่จำกัดช่วงวันที่)
                                </Form.Text>
                            </Col>
                        </Row>
                    </div>
                    
                    <div className="export-modal-section">
                        <Form.Group>
                            <Form.Label>เลือกสถานะข้อความ</Form.Label>
                            <Form.Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                                <option value="all">ทั้งหมด</option>
                                <option value="ใหม่">ใหม่</option>
                                <option value="อ่านแล้ว">อ่านแล้ว</option>
                                <option value="ตอบแล้ว">ตอบแล้ว</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="success" onClick={handleExport}>
                    <BsDownload /> Export Excel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExportInboxModal;