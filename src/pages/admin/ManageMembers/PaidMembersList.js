import React, { useState, useMemo } from 'react';
import { Badge, Table, Pagination, Form } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PaidMembersList = ({ members }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [planFilter, setPlanFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const ITEMS_PER_PAGE = 5;

    const filteredMembers = useMemo(() => {
        return members.filter(m => 
            (planFilter === 'all' || m.plan === planFilter) &&
            (statusFilter === 'all' || m.status === statusFilter)
        );
    }, [members, planFilter, statusFilter]);

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const currentItems = filteredMembers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setCurrentPage(1);
    };

    const getStatusBadge = (status) => {
        if (status === 'อนุมัติ') return 'approved';
        if (status === 'รอการอนุมัติเอกสาร') return 'waiting-doc';
        if (status === 'รอการอนุมัติการชำระเงิน') return 'waiting-payment';
        return 'secondary';
    };

    return (
        <>
            <div className="filter-controls mb-4">
                <Form.Group controlId="planFilter" className="d-flex align-items-center">
                    <Form.Label className="filter-label me-2 mb-0">แผน:</Form.Label>
                    <Form.Select className="custom-form-select" value={planFilter} onChange={handleFilterChange(setPlanFilter)}>
                        <option value="all">ทั้งหมด</option>
                        <option value="นิติบุคคล">นิติบุคคล</option>
                        <option value="บุคคลธรรมดา">บุคคลธรรมดา</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="statusFilter" className="d-flex align-items-center">
                    <Form.Label className="filter-label me-2 mb-0">สถานะ:</Form.Label>
                    <Form.Select className="custom-form-select" value={statusFilter} onChange={handleFilterChange(setStatusFilter)}>
                        <option value="all">ทั้งหมด</option>
                        <option value="อนุมัติ">อนุมัติ</option>
                        <option value="รอการอนุมัติเอกสาร">รอการอนุมัติเอกสาร</option>
                        <option value="รอการอนุมัติการชำระเงิน">รอการอนุมัติการชำระเงิน</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <Table responsive hover className="data-table">
                <thead>
                    <tr>
                        <th>ชื่อ - นามสกุล</th>
                        <th>Email</th>
                        <th>วันที่สมัครสมาชิก</th>
                        <th>แผน</th>
                        <th>สถานะ</th>
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(member => (
                        <tr key={member.id}>
                            <td>{`${member.firstName} ${member.lastName}`}</td>
                            <td>{member.email}</td>
                            <td>{member.joinDate}</td>
                            <td>{member.plan}</td>
                            <td>
                                <Badge pill className={`status-badge status-${getStatusBadge(member.status)}`}>
                                    {member.status}
                                </Badge>
                            </td>
                            <td>
                                <Link to={`/admin/manage-members/${member.id}`} className="action-icon" title="ดูรายละเอียด"><BsEye /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                {totalPages > 1 && (
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
                        {[...Array(totalPages).keys()].map(n => (
                            <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
                                {n + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                    </Pagination>
                )}
            </div>
        </>
    );
};

export default PaidMembersList;