import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Tab, Button, Table, Badge, Pagination, Image, Spinner } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill, BsPlusLg, BsDownload } from 'react-icons/bs';
import './ManageNewsAndEvents.css';
import ExportNewsModal from './ExportNewsModal';
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const csrfToken = getCookie("csrftoken");
const ManageNewsPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeListTab, setActiveListTab] = useState('all'); // 'all', 'draft', 'published'
    const [currentPage, setCurrentPage] = useState(1);
    const [showExportModal, setShowExportModal] = useState(false);
    const ITEMS_PER_PAGE = 5;

    // ดึงข้อมูลจาก API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/content/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // กรองเฉพาะ type: 'news'
    const newsPosts = useMemo(() => {
        return posts.filter(post => post.type === 'news');
    }, [posts]);

    const filteredNews = useMemo(() => {
        return newsPosts.filter(post => {
            if (activeListTab === 'published') return post.is_published;
            if (activeListTab === 'draft') return !post.is_published;
            return true;
        });
    }, [newsPosts, activeListTab]);

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

const handleDelete = async (id, title) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข่าว "${title}"?`)) {
        try {
            await axios.delete(`http://localhost:8000/api/content/posts/${id}/`, {
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true,
            });

            setPosts(prev => prev.filter(item => item.id !== id));
            alert(`ลบข่าว "${title}" เรียบร้อยแล้ว`);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลบ:", error);
            alert("ลบข่าวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
        }
    }
};

    const statusMap = {
        true: 'success',   // published
        false: 'danger',   // draft
    };

    return (
        <>
            <Container fluid className="manage-news-page p-0">
                <div className="content-wrapper p-3 p-md-4">
                    <Container fluid className="manage-news-page">
                        <div className="page-header">
                            <h2 className="page-title">จัดการข่าว/กิจกรรม</h2>
                        </div>

                        <Tab.Container defaultActiveKey="/admin/manage-news" onSelect={(k) => navigate(k)}>
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

                            {loading ? (
                                <div className="text-center p-5"><Spinner animation="border" /></div>
                            ) : (
                                <Table responsive hover className="news-table">
                                    <thead>
                                        <tr>
                                            <th>รูปหน้าปก</th><th>หัวข้อข่าว</th><th>วันที่สร้าง</th><th>สถานะ</th><th>การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map(item => (
                                            <tr key={item.id}>
                                                <td><Image src={item.cover_image} className="cover-thumbnail" /></td>
                                                <td>{item.title}</td>
                                                <td>{new Date(item.published_at).toLocaleDateString()}</td>
                                                <td><Badge pill bg={statusMap[item.is_published]}>{item.is_published ? 'เผยแพร่' : 'แบบร่าง'}</Badge></td>
                                                <td>
                                                    <Link to={`/admin/manage-news/edit/${item.id}`} className="action-icon edit-icon"><BsPencilFill /></Link>
                                                    <button className="action-icon delete-icon" onClick={() => handleDelete(item.id, item.title)}><BsTrashFill /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}

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
                newsItems={newsPosts} 
            />
        </>
    );
};

export default ManageNewsPage;
