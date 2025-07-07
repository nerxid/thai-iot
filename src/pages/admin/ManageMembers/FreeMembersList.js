import React, { useState, useMemo } from 'react';
import { Badge, Table, Pagination, Button } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const FreeMembersList = ({ members }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('all');
    const ITEMS_PER_PAGE = 5;

    const filteredMembers = useMemo(() => {
        if (activeFilter === 'all') return members;
        return members.filter(m => m.plan === activeFilter);
    }, [members, activeFilter]);

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const currentItems = filteredMembers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="filter-buttons mb-4">
                <Button variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('all')}>ทั้งหมด</Button>
                <Button variant={activeFilter === 'วิสามัญ' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('วิสามัญ')}>วิสามัญ</Button>
                <Button variant={activeFilter === 'ผู้สนใจทั่วไป' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('ผู้สนใจทั่วไป')}>ผู้สนใจทั่วไป</Button>
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
                            <td><Badge pill className="status-badge status-free">{member.status}</Badge></td>
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

export default FreeMembersList;