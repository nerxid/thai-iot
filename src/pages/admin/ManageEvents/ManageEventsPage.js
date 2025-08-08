import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Tab, Button, Table, Badge, Pagination, Image, Form } from 'react-bootstrap';
import { BsPencilFill, BsEyeFill, BsTrashFill, BsPlusLg, BsDownload } from 'react-icons/bs';
import '../ManageNews/ManageNewsAndEvents.css';
import ExportEventsModal from './ExportEventsModal';
import axios from 'axios';

const ManageEventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeEventStatusTab, setActiveEventStatusTab] = useState('all');
    const [activePublishStatusTab, setActivePublishStatusTab] = useState('all');
    const [showExportModal, setShowExportModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/content/posts/');
                // กรองเฉพาะประเภท event
                const eventPosts = response.data.filter(post => post.type === 'event');
                setEvents(eventPosts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, []);

    const adminEventsData = useMemo(() => {
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);

        return events.map((event, index) => {
            // ตัวอย่างการแปลงข้อมูลจาก API ให้ตรงกับโครงสร้างที่ต้องการ
            const endDate = new Date(event.published_at); // ควรใช้ฟิลด์วันที่สิ้นสุดจริงจาก API
            let eventStatus = 'ยังไม่สิ้นสุด';
            if (endDate < today) {
                eventStatus = 'สิ้นสุด';
            }
            
            return {
                ...event, 
                id: event.id,
                title: event.title,
                coverImage: event.cover_image,
                interestedCount: 0, // ควรดึงจาก API จริง
                createdDate: new Date(event.published_at).toLocaleDateString('th-TH', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                eventStatus: eventStatus,
                publishStatus: event.is_published ? 'เผยแพร่' : 'แบบร่าง',
                imageUrl: event.cover_image // สำหรับความเข้ากันได้กับโค้ดเดิม
            };
        });
    }, [events]);

    const filteredEvents = useMemo(() => {
        let items = adminEventsData;
        if (activeEventStatusTab !== 'all') {
            items = items.filter(item => item.eventStatus === activeEventStatusTab);
        }
        if (activePublishStatusTab !== 'all') {
            items = items.filter(item => item.publishStatus === activePublishStatusTab);
        }
        return items;
    }, [adminEventsData, activeEventStatusTab, activePublishStatusTab]);

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setCurrentPage(1); 
    };
    
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const currentItems = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = async (eventId, eventTitle) => {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรม "${eventTitle}"?`)) {
             const csrfToken = getCookie('csrftoken');
            try {
                await axios.delete(`http://localhost:8000/api/content/posts/${eventId}/`,{
                    headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                alert(`ลบกิจกรรม "${eventTitle}" เรียบร้อยแล้ว`);
            } catch (err) {
                console.error('Error deleting event:', err);
                alert('เกิดข้อผิดพลาดในการลบกิจกรรม');
            }
        }
    };

    const getEventStatusBadge = (status) => {
        switch (status) {
            case 'สิ้นสุด': return 'secondary';
            case 'ยังไม่สิ้นสุด': return 'primary';
            case 'อยู่ระหว่างเปิดรับ': return 'success';
            default: return 'light';
        }
    };

    const getPublishStatusBadge = (status) => {
        switch (status) {
            case 'เผยแพร่': return 'success';
            case 'แบบร่าง': return 'danger';
            default: return 'secondary';
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Container fluid className="manage-news-page p-0">
                <div className="content-wrapper p-3 p-md-4">
                    <Container fluid className="manage-events-page">
                        <div className="page-header">
                            <h2 className="page-title">จัดการข่าว/กิจกรรม</h2>
                        </div>
                        <Tab.Container id="news-events-tabs" activeKey="/admin/manage-events" onSelect={(k) => navigate(k)}>
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item><Nav.Link eventKey="/admin/manage-news">ข่าว</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="/admin/manage-events">กิจกรรม</Nav.Link></Nav.Item>
                            </Nav>
                        </Tab.Container>

                        <div className="list-container">
                            <div className="list-header">
                                <div className="filter-controls d-flex flex-wrap gap-3">
                                    <Form.Group controlId="eventStatusFilter" className="d-flex align-items-center">
                                        <Form.Label className="filter-label me-2 mb-0">สถานะกิจกรรม:</Form.Label>
                                        <Form.Select className="custom-form-select" value={activeEventStatusTab} onChange={handleFilterChange(setActiveEventStatusTab)} style={{ minWidth: '160px' }}>
                                            <option value="all">ทั้งหมด</option>
                                            <option value="สิ้นสุด">สิ้นสุด</option>
                                            <option value="ยังไม่สิ้นสุด">ยังไม่สิ้นสุด</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="publishStatusFilter" className="d-flex align-items-center">
                                        <Form.Label className="filter-label me-2 mb-0">สถานะการเผยแพร่:</Form.Label>
                                        <Form.Select className="custom-form-select" value={activePublishStatusTab} onChange={handleFilterChange(setActivePublishStatusTab)} style={{ minWidth: '160px' }}>
                                            <option value="all">ทั้งหมด</option>
                                            <option value="เผยแพร่">เผยแพร่</option>
                                            <option value="แบบร่าง">แบบร่าง</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="action-buttons">
                                    <Button variant="outline-success" className="me-2" onClick={() => setShowExportModal(true)}><BsDownload /> Export Excel</Button>
                                    <Button as={Link} to="/admin/manage-events/add"><BsPlusLg /> เพิ่มกิจกรรม</Button>
                                </div>
                            </div>

                            <Table responsive hover className="data-table">
                                <thead>
                                    <tr>
                                        <th>รูปหน้าปก</th><th>หัวข้อกิจกรรม</th><th>จำนวนผู้สนใจ</th><th>วันที่สร้าง</th><th>สถานะกิจกรรม</th><th>สถานะเผยแพร่</th><th>การจัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
                                        <tr key={item.id}>
                                            <td><Image src={item.coverImage} className="cover-thumbnail" /></td>
                                            <td className="title-cell">{item.title}</td>
                                            <td>{item.interestedCount}</td>
                                            <td>{item.createdDate}</td>
                                            <td><Badge pill bg={getEventStatusBadge(item.eventStatus)}>{item.eventStatus}</Badge></td>
                                            <td><Badge pill bg={getPublishStatusBadge(item.publishStatus)}>{item.publishStatus}</Badge></td>
                                            <td>
                                                <Link to={`/admin/manage-events/${item.id}/registrants`} className="action-icon view-icon" title="ดูรายชื่อผู้สนใจ"><BsEyeFill /></Link>
                                                <Link to={`/admin/manage-events/edit/${item.id}`} className="action-icon edit-icon" title="แก้ไข"><BsPencilFill /></Link>
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
                                        {[...Array(totalPages).keys()].map(n => (
                                            <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => handlePageChange(n + 1)}>{n + 1}</Pagination.Item>
                                        ))}
                                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                    </Pagination>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            </Container>
            <ExportEventsModal show={showExportModal} onHide={() => setShowExportModal(false)} events={adminEventsData} />
        </>
    );
};

export default ManageEventsPage;