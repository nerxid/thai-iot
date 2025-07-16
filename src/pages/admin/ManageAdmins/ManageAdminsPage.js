import React, { useState, useMemo } from 'react';
import { Container, Button, Table, Badge, Form } from 'react-bootstrap';
import { BsDownload, BsPencilFill, BsToggleOn, BsToggleOff, BsTrashFill } from 'react-icons/bs'; 
import { mockAdminsData } from '../../../data/mock-admins';
import AdminFormModal from './AdminFormModal';
import ExportAdminsModal from './ExportAdminsModal';
import './ManageAdmins.css';

const ManageAdminsPage = () => {
    const [admins, setAdmins] = useState(mockAdminsData);
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showExportModal, setShowExportModal] = useState(false);

    const filteredAdmins = useMemo(() => {
        return admins.filter(admin => 
            (roleFilter === 'all' || admin.role === roleFilter) &&
            (statusFilter === 'all' || admin.status === statusFilter)
        );
    }, [admins, roleFilter, statusFilter]);

    const handleShowAddModal = () => {
        setEditingAdmin(null);
        setShowModal(true);
    };

    const handleShowEditModal = (admin) => {
        setEditingAdmin(admin);
        setShowModal(true);
    };

    const handleSaveAdmin = (formData) => {
        if (formData.id) { 
            setAdmins(admins.map(admin => admin.id === formData.id ? { ...admin, ...formData } : admin));
        } else { // Add mode
            const newId = Math.max(...admins.map(a => a.id)) + 1;
            setAdmins([...admins, { ...formData, id: newId, status: 'ใช้งานอยู่' }]);
        }
        setShowModal(false);
    };

    const toggleAdminStatus = (adminId) => {
        setAdmins(admins.map(admin => 
            admin.id === adminId 
                ? { ...admin, status: admin.status === 'ใช้งานอยู่' ? 'ไม่ได้ใช้งาน' : 'ใช้งานอยู่' }
                : admin
        ));
    };

     const handleDeleteAdmin = (adminId, adminName) => {
        if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ Admin "${adminName}"?`)) {
            setAdmins(admins.filter(admin => admin.id !== adminId));
            alert(`ลบ Admin "${adminName}" เรียบร้อยแล้ว`);
        }
    };

    return (
        <>
            <Container fluid className="manage-admins-page">
                <div className="page-header">
                    <h2 className="page-title">จัดการ Admin</h2>
                </div>
                <div className="list-container">
                    <div className="list-header">
                        <div className="filter-controls">
                            <Form.Group className="d-flex align-items-center me-3">
                                <Form.Label className="me-2 mb-0">Role</Form.Label>
                                <Form.Select size="sm" onChange={(e) => setRoleFilter(e.target.value)}>
                                    <option value="all">ทั้งหมด</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Membership Admin">Membership Admin</option>
                                    <option value="Content Admin">Content Admin</option>
                                    <option value="Contact Admin">Contact Admin</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center">
                                <Form.Label className="me-2 mb-0">สถานะ</Form.Label>
                                <Form.Select size="sm" onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">ทั้งหมด</option>
                                    <option value="ใช้งานอยู่">ใช้งานอยู่</option>
                                    <option value="ไม่ได้ใช้งาน">ไม่ได้ใช้งาน</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="action-buttons">
                            <Button variant="outline-success" className="me-2" onClick={() => setShowExportModal(true)}>
                                <BsDownload /> Export Excel
                            </Button>
                            <Button onClick={handleShowAddModal}>เพิ่ม Admin +</Button>
                        </div>
                    </div>

                    <Table hover responsive className="admin-table mt-4">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ-นามสกุล</th>
                                <th>E-mail</th>
                                <th>Role</th>
                                <th>สถานะ</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                            <tbody>
                                {filteredAdmins.map((admin, index) => (
                                    <tr key={admin.id}>
                                        <td>{index + 1}</td>
                                        <td>{`${admin.firstName} ${admin.lastName}`}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.role}</td>
                                        <td><Badge bg={admin.status === 'ใช้งานอยู่' ? 'success' : 'danger'}>{admin.status}</Badge></td>
                                        <td className="admin-actions">
                                            <Button variant="link" className="p-0" onClick={() => toggleAdminStatus(admin.id)} title={admin.status === 'ใช้งานอยู่' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}>
                                                {admin.status === 'ใช้งานอยู่' ? <BsToggleOn className="status-toggle-icon active" /> : <BsToggleOff className="status-toggle-icon inactive" />}
                                            </Button>

                                            <span onClick={() => handleShowEditModal(admin)} title="แก้ไข">
                                                <BsPencilFill className="edit-icon" />
                                            </span>

                                            <span onClick={() => handleDeleteAdmin(admin.id, `${admin.firstName} ${admin.lastName}`)} title="ลบ">
                                                <BsTrashFill className="delete-icon" />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </Table>
                </div>
            </Container>

            <AdminFormModal 
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={handleSaveAdmin}
                initialData={editingAdmin}
            />

             <ExportAdminsModal
                show={showExportModal}
                onHide={() => setShowExportModal(false)}
                admins={admins}
            />
        </>
    );
};

export default ManageAdminsPage;