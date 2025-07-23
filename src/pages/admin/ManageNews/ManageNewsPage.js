import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Tab, Button, Table, Badge, Pagination, Image } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill, BsPlusLg, BsDownload } from 'react-icons/bs';
import './ManageNewsAndEvents.css';
import { newsData } from '../../../data/mock-news'; 
import ExportNewsModal from './ExportNewsModal';

const ManageNewsPage = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState(newsData);
    const [activeListTab, setActiveListTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showExportModal, setShowExportModal] = useState(false);
    const ITEMS_PER_PAGE = 5; 

    const filteredNews = useMemo(() => {
        if (activeListTab === 'published') {
            return news.filter(item => item.status === 'เผยแพร่');
        }
        if (activeListTab === 'draft') {
            return news.filter(item => item.status === 'แบบร่าง');
        }
        return news;
    }, [activeListTab, news]);

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const currentItems = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (tab) => {
        setActiveListTab(tab);
        setCurrentPage(1);
    };
    
    const handleDelete = (newsId, newsTitle) => {
        if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข่าว "${newsTitle}"?`)) {
            setNews(prevNews => prevNews.filter(item => item.id !== newsId));
            alert(`ลบข่าว "${newsTitle}" เรียบร้อยแล้ว`);
        }
    };

    const statusMap = {
        'เผยแพร่': 'success', 
        'แบบร่าง': 'danger',  
    };
    
    return (
        <>
            <Container fluid className="manage-news-page p-0">
                <div className="content-wrapper p-3 p-md-4">
                    <Container fluid className="manage-news-page">
                        <div className="page-header">
                            <h2 className="page-title">จัดการข่าว/กิจกรรม</h2>
                        </div>
                        <Tab.Container id="news-events-tabs" defaultActiveKey="/admin/manage-news" onSelect={(k) => navigate(k)}>
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item><Nav.Link eventKey="/admin/manage-news">ข่าว</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="/admin/manage-events">กิจกรรม</Nav.Link></Nav.Item>
                            </Nav>
                        </Tab.Container>
                        
                        <div className="list-container">
                            <div className="list-header">
                                <div className="filter-buttons">
                                    <Button variant={activeListTab === 'all' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('all')}>ทั้งหมด</Button>
                                    <Button variant={activeListTab === 'draft' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('draft')}>แบบร่าง</Button>
                                    <Button variant={activeListTab === 'published' ? 'primary' : 'outline-secondary'} onClick={() => handleFilterChange('published')}>เผยแพร่</Button>
                                </div>
                                <div className="action-buttons">
                                    <Button variant="outline-success" className="me-2" onClick={() => setShowExportModal(true)}><BsDownload /> Export Excel</Button>
                                    <Button as={Link} to="/admin/manage-news/add"><BsPlusLg /> เพิ่มข่าว</Button>
                                </div>
                            </div>

                            <Table responsive hover className="news-table">
                                <thead>
                                    <tr>
                                        <th>รูปหน้าปก</th><th>หัวข้อข่าว</th><th>วันที่สร้าง</th><th>สถานะ</th><th>การจัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
                                        <tr key={item.id}>
                                            <td><Image src={item.imageUrl} className="cover-thumbnail" /></td>
                                            <td className="news-title-cell">{item.title}</td>
                                            <td>{item.date}</td>
                                            <td><Badge pill bg={statusMap[item.status]}>{item.status}</Badge></td>
                                            <td>
                                                <Link to={`/admin/manage-news/edit/${item.id}`} className="action-icon edit-icon" title="แก้ไข"><BsPencilFill /></Link>
                                                <button className="action-icon delete-icon" title="ลบ" onClick={() => handleDelete(item.id, item.title)}><BsTrashFill /></button>
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
            </div>
        </Container>
        </div>
        </Container>
        <ExportNewsModal 
                show={showExportModal}
                onHide={() => setShowExportModal(false)}
                newsItems={newsData} 
            />
        </>
    );
};

export default ManageNewsPage;