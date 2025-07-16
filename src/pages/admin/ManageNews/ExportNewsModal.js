import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const ExportNewsModal = ({ show, onHide, newsItems }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // State สำหรับเก็บสถานะ

    const handleExport = () => {
        // 1. กรองข้อมูลตามเงื่อนไขที่เลือก
        const filteredData = newsItems.filter(item => {
            // กรองด้วยสถานะ
            const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
            
            // กรองด้วยวันที่
            const itemDate = new Date(item.date);
            const startMatch = !startDate || itemDate >= startDate;
            const endMatch = !endDate || itemDate <= endDate;

            return statusMatch && startMatch && endMatch;
        });

        if (filteredData.length === 0) {
            alert("ไม่พบข้อมูลข่าวตามเงื่อนไขที่ท่านเลือก");
            return;
        }

        // 2. เตรียมข้อมูลสำหรับใส่ใน Excel
        const dataForExcel = filteredData.map(item => ({
            'หัวข้อข่าว': item.title,
            // แปลง HTML เป็น Text และตัดให้เหลือ 200 ตัวอักษรเพื่อไม่ให้เซลล์ยาวเกินไป
            'รายละเอียด': stripHtml(item.content).substring(0, 200) + '...', 
            'วันที่สร้าง': item.date,
            'สถานะ': item.status,
            'ผู้เขียน': item.author,
        }));


        // 3. สร้างไฟล์ Excel และดาวน์โหลด
        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "News");
        
        const date = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `ThaiIoT_News_Export_${date}.xlsx`);

        onHide(); // ปิด Modal หลัง Export สำเร็จ
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>ส่งออกข้อมูลข่าวเป็น Excel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* ส่วนเลือกช่วงวันที่ */}
                    <Form.Group as={Row} className="mb-3 export-modal-section">
                        <Form.Label column sm={12}>เลือกช่วงวันที่สร้างข่าว</Form.Label>
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
                    </Form.Group>
                    
                    {/* ส่วนเลือกสถานะ */}
                    <Form.Group className="mb-3 export-modal-section">
                        <Form.Label>เลือกสถานะ</Form.Label>
                        <Form.Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                            <option value="all">ทั้งหมด</option>
                            <option value="เผยแพร่">เผยแพร่</option>
                            <option value="แบบร่าง">แบบร่าง</option>
                        </Form.Select>
                    </Form.Group>
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

export default ExportNewsModal;