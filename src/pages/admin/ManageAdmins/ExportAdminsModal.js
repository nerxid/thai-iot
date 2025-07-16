import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const ExportAdminsModal = ({ show, onHide, admins }) => {
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleExport = () => {
        // กรองข้อมูลตามเงื่อนไขที่เลือก
        const filteredData = admins.filter(admin => {
            const roleMatch = selectedRole === 'all' || admin.role === selectedRole;
            const statusMatch = selectedStatus === 'all' || admin.status === selectedStatus;
            return roleMatch && statusMatch;
        });

        if (filteredData.length === 0) {
            alert("ไม่พบข้อมูล Admin ตามเงื่อนไขที่ท่านเลือก");
            return;
        }

        // เตรียมข้อมูลสำหรับใส่ใน Excel
        const dataForExcel = filteredData.map(admin => ({
            'ชื่อ-นามสกุล': `${admin.firstName} ${admin.lastName}`,
            'E-mail': admin.email,
            'Role': admin.role,
            'สถานะ': admin.status,
        }));

        // สร้างไฟล์ Excel และดาวน์โหลด
        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Admins List");
        
        const date = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `ThaiIoT_Admins_Export_${date}.xlsx`);

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>ส่งออกข้อมูล Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="export-modal-section">
                        <Form.Group>
                            <Form.Label>กรองตาม Role</Form.Label>
                            <Form.Select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                                <option value="all">ทั้งหมด</option>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Membership Admin">Membership Admin</option>
                                <option value="Content Admin">Content Admin</option>
                                <option value="Contact Admin">Contact Admin</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    
                    <div className="export-modal-section">
                        <Form.Group>
                            <Form.Label>กรองตามสถานะ</Form.Label>
                            <Form.Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                                <option value="all">ทั้งหมด</option>
                                <option value="ใช้งานอยู่">ใช้งานอยู่</option>
                                <option value="ไม่ได้ใช้งาน">ไม่ได้ใช้งาน</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>ยกเลิก</Button>
                <Button variant="success" onClick={handleExport}>
                    <BsDownload /> Export Excel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExportAdminsModal;