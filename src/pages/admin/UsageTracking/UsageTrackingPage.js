import React, { useState, useMemo } from 'react';
import { Container, Button, Table, Pagination } from 'react-bootstrap'; // นำ Row, Col, Nav ออก และเพิ่ม Button
import { mockUsageLogs } from '../../../data/mock-usage-logs';
import './UsageTracking.css';

const UsageTrackingPage = () => {
    const [logs] = useState(mockUsageLogs);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const filteredLogs = useMemo(() => {
        if (activeFilter === 'all') {
            return logs;
        }
        return logs.filter(log => log.userType === activeFilter);
    }, [logs, activeFilter]);

    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const currentItems = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    return (
        <Container fluid className="usage-tracking-page">
            <div className="page-header">
                <h2 className="page-title">ติดตามการใช้งานระบบ</h2>
            </div>

            <div className="list-container">
                 <h4 className="list-title">รายการการใช้งานระบบ</h4>
                <div className="list-header">
                   
                    <div className="filter-buttons">
                        <Button variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('all')}>ทั้งหมด</Button>
                        <Button variant={activeFilter === 'admin' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('admin')}>การใช้งาน Admin</Button>
                        <Button variant={activeFilter === 'member' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('member')}>การใช้งานสมาชิก</Button>
                    </div>
                </div>

                <Table hover responsive className="usage-table mt-4">
                    <thead>
                        <tr>
                            <th>ชื่อ-นามสกุล</th>
                            <th>Role</th>
                            <th>IP Address</th>
                            <th>วันที่เข้าสู่ระบบล่าสุด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(log => (
                            <tr key={log.id}>
                                <td>{log.name}</td>
                                <td>{log.role}</td>
                                <td>{log.ipAddress}</td>
                                <td>{log.lastLogin}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map(n => (
                                <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
                                    {n + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default UsageTrackingPage;