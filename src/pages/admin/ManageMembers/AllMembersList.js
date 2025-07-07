import React, { useState } from 'react';
import { Badge, Table, Pagination } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AllMembersList = ({ members }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 7;

    const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
    const currentItems = members.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const getStatusBadge = (status) => {
        if (status === 'อนุมัติ') return 'approved';
        if (status === 'รอการอนุมัติเอกสาร') return 'waiting-doc';
        if (status === 'รอการอนุมัติการชำระเงิน') return 'waiting-payment';
        if (status === 'ฟรี') return 'free';
        return 'secondary';
    };

    return (
        <>
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

export default AllMembersList;