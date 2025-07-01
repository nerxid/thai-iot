import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tabs, Tab, Button, Table, Badge, Pagination, Image } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill, BsPlusLg, BsDownload } from 'react-icons/bs';
import './ManageNews.css';
import { newsData } from '../../../data/mock-news'; 

const ManageNewsPage = () => {
    const [activeListTab, setActiveListTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; 

    const filteredNews = useMemo(() => {
        if (activeListTab === 'published') {
            return newsData.filter(item => item.status === 'เผยแพร่');
        }
        if (activeListTab === 'draft') {
            return newsData.filter(item => item.status === 'แบบร่าง');
        }
        return newsData; // Default คือ 'all'
    }, [activeListTab]);

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (tab) => {
        setActiveListTab(tab);
        setCurrentPage(1);
    };

    const statusMap = {
        'เผยแพร่': 'published',
        'แบบร่าง': 'draft',
    };
    
    return (
        <Container fluid className="manage-news-page">
            <div className="page-header">
                <h2 className="page-title">จัดการข่าว/กิจกรรม</h2>
            </div>

            <Tabs defaultActiveKey="news" id="news-events-tabs" className="mb-4">
                <Tab eventKey="news" title="ข่าว">
                    <div className="list-header">
                        <div className="filter-buttons">
                            <Button variant={activeListTab === 'all' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('all')}>ทั้งหมด</Button>
                            <Button variant={activeListTab === 'draft' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('draft')}>แบบร่าง</Button>
                            <Button variant={activeListTab === 'published' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('published')}>เผยแพร่</Button>
                        </div>
                        <div className="action-buttons">
                            <Button variant="outline-success" className="me-2"><BsDownload /> Export Excel</Button>
                            <Button as={Link} to="/admin/manage-news/add"><BsPlusLg /> เพิ่มข่าว</Button>
                        </div>
                    </div>

                    <Table responsive hover className="news-table">
                        <thead>
                            <tr>
                                <th>รูปหน้าปก</th>
                                <th>หัวข้อข่าว</th>
                                <th>วันที่สร้าง</th>
                                <th>สถานะ</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => (
                                <tr key={item.id}>
                                    <td><Image src={item.imageUrl} className="cover-thumbnail" /></td>
                                    <td className="news-title-cell">{item.title}</td>
                                    <td>{item.date}</td>
                                    <td><Badge pill className={`status-badge status-${statusMap[item.status]}`}>{item.status}</Badge></td>
                                    <td>
                                        <Link to={`/admin/manage-news/edit/${item.id}`} className="action-icon edit-icon"><BsPencilFill /></Link>
                                        <button className="action-icon delete-icon"><BsTrashFill /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-center">
                        {totalPages > 1 && (
                            <Pagination>
                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                {[...Array(totalPages).keys()].map(number => (
                                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            </Pagination>
                        )}
                    </div>

                </Tab>
                <Tab eventKey="events" title="กิจกรรม">
                    <div className="p-5 text-center text-muted">
                        <h4>ส่วนจัดการกิจกรรม</h4>
                        
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default ManageNewsPage;