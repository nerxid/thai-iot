import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

const ExportEventsModal = ({ show, onHide, events }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [eventStatus, setEventStatus] = useState('all');

    const handleExport = () => {
        const filteredData = events.filter(event => {
            const statusMatch = eventStatus === 'all' || event.eventStatus === eventStatus;
            const eventDate = new Date(event.createdDate.split(' ')[2], new Date(event.createdDate).getMonth(), event.createdDate.split(' ')[0]);
            const startMatch = !startDate || eventDate >= startDate;
            const endMatch = !endDate || eventDate <= endDate;
            return statusMatch && startMatch && endMatch;
        });

        if (filteredData.length === 0) {
            alert("ไม่พบข้อมูลกิจกรรมตามเงื่อนไขที่ท่านเลือก");
            return;
        }

        const dataForExcel = filteredData.map(item => ({
            'หัวข้อกิจกรรม': item.title,
            'จำนวนผู้สนใจ': item.interestedCount,
            'วันที่สร้าง': item.createdDate,
            'สถานะกิจกรรม': item.eventStatus,
            'สถานะเผยแพร่': item.publishStatus,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
        const date = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `ThaiIoT_Events_List_Export_${date}.xlsx`);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>ส่งออกข้อมูลภาพรวมกิจกรรม</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3 export-modal-section">
                        <Form.Label column sm={12}>เลือกช่วงวันที่สร้างกิจกรรม</Form.Label>
                        <Col sm={6}><DatePicker selected={startDate} onChange={date => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} placeholderText="วันที่เริ่มต้น" className="form-control" isClearable dateFormat="dd/MM/yyyy" portalId="datepicker-portal" /></Col>
                        <Col sm={6}><DatePicker selected={endDate} onChange={date => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} placeholderText="วันที่สิ้นสุด" className="form-control" isClearable dateFormat="dd/MM/yyyy"  portalId="datepicker-portal"/></Col>
                    <Col sm={12} className="mt-2">
                        <Form.Text muted>
                            (เว้นว่างเพื่อส่งออกข้อมูลทั้งหมดโดยไม่จำกัดช่วงวันที่)
                        </Form.Text>
                    </Col>
                    </Form.Group>
                    
                    
                    <Form.Group className="mb-3 export-modal-section">
                        <Form.Label>เลือกสถานะกิจกรรม</Form.Label>
                        <Form.Select value={eventStatus} onChange={e => setEventStatus(e.target.value)}>
                            <option value="all">ทั้งหมด</option>
                            <option value="สิ้นสุด">สิ้นสุด</option>
                            <option value="ยังไม่สิ้นสุด">ยังไม่สิ้นสุด</option>
                        </Form.Select>
                    </Form.Group>

                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="success" onClick={handleExport}><BsDownload /> Export Excel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExportEventsModal;