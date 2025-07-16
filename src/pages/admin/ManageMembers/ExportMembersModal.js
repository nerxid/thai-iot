import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs'; // <-- เพิ่มบรรทัดนี้
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

const ExportMembersModal = ({ show, onHide, members }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedPlans, setSelectedPlans] = useState({});
    const [selectAll, setSelectAll] = useState(false)

    const uniquePlans = useMemo(() => {
        const plans = new Set(members.map(m => m.plan));
        return Array.from(plans);
    }, [members]);

    const handleSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        
        const newSelectedPlans = {};
        if (isChecked) {
            uniquePlans.forEach(plan => {
                newSelectedPlans[plan] = true;
            });
        }
        setSelectedPlans(newSelectedPlans);
    };

    const handlePlanChange = (plan) => {
        setSelectedPlans(prev => ({
            ...prev,
            [plan]: !prev[plan]
        }));
    };

    useEffect(() => {
        const allAreSelected = uniquePlans.length > 0 && uniquePlans.every(plan => selectedPlans[plan]);
        setSelectAll(allAreSelected);
    }, [selectedPlans, uniquePlans]);

    const handleExport = () => {
        
        const plansToExport = Object.keys(selectedPlans).filter(plan => selectedPlans[plan]);

        const filteredData = members.filter(member => {
            const planMatch = plansToExport.length === 0 || plansToExport.includes(member.plan);
            
            const memberJoinDate = new Date(member.joinDate.split('/').reverse().join('-'));
            const startMatch = !startDate || memberJoinDate >= startDate;
            const endMatch = !endDate || memberJoinDate <= endDate;

            return planMatch && startMatch && endMatch;
        });

        if (filteredData.length === 0) {
            alert("ไม่พบข้อมูลตามเงื่อนไขที่ท่านเลือก");
            return;
        }

        const dataForExcel = filteredData.map(m => ({
            'ชื่อ-นามสกุล': `${m.firstName} ${m.lastName}`,
            'Email': m.email,
            'วันที่สมัคร': m.joinDate,
            'แผน': m.plan,
            'สถานะ': m.status,
            'เบอร์โทรศัพท์': m.phone,
            'องค์กร': m.organization || '-'
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
        
        const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        XLSX.writeFile(workbook, `ThaiIoT_Members_Export_${date}.xlsx`);

        onHide(); 
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>ส่งออกข้อมูลสมาชิกเป็น Excel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
       
        <Form.Group as={Row} className="mb-3 export-modal-section">
            <Form.Label column sm={12}>เลือกช่วงวันที่สมัครของสมาชิก</Form.Label>
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
        
        <Form.Group className="mb-3 export-modal-section">
                        <Form.Label>เลือกแผนสมาชิก</Form.Label>
                        <Form.Check 
                            type="checkbox"
                            id="select-all-plans"
                            label="เลือกทั้งหมด"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            className="fw-bold mb-2"
                        />
                        <hr className="my-2"/>
                        <div className="plan-checkbox-group">
                            {uniquePlans.map(plan => (
                                <Form.Check 
                                    key={plan}
                                    type="checkbox"
                                    id={`check-plan-${plan}`}
                                    label={plan}
                                    checked={!!selectedPlans[plan]}
                                    onChange={() => handlePlanChange(plan)}
                                />
                            ))}
                        </div>
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

export default ExportMembersModal;