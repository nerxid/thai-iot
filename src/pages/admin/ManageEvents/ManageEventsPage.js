import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Tab, Button, Table, Badge, Pagination, Image, Form } from 'react-bootstrap';
import { BsPencilFill, BsEyeFill, BsTrashFill, BsPlusLg, BsDownload } from 'react-icons/bs';
import './ManageEvents.css';
import { rawEventsData } from '../../../data/mock-events';

const ManageEventsPage = () => {
    const navigate = useNavigate();
    const [activeEventStatusTab, setActiveEventStatusTab] = useState('all');
    const [activePublishStatusTab, setActivePublishStatusTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const adminEventsData = useMemo(() => {
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);

        return rawEventsData.map((event, index) => {
            const endDate = new Date(event.end);
            
            let eventStatus = 'ยังไม่สิ้นสุด';
            if (endDate < today) {
                eventStatus = 'สิ้นสุด';
            }

            return {
                ...event, 
                coverImage: event.imageUrl,
                
                interestedCount: event.registrantCount, 
                
                
                createdDate: `${20 + index} มิถุนายน 2568`, 
                
                eventStatus: eventStatus,
            };
        });
    }, []);

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

    return (
        <Container fluid className="manage-events-page">
            <div className="page-header">
                <h2 className="page-title">จัดการข่าว/กิจกรรม</h2>
            </div>

            <Tab.Container id="news-events-tabs" activeKey="/admin/manage-events" onSelect={(k) => navigate(k)}>
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="/admin/manage-news">ข่าว</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/admin/manage-events">กิจกรรม</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>

            <div className="list-container">
                 <div className="list-header">
                    <div className="filter-controls d-flex flex-wrap gap-3">
                        <Form.Group controlId="eventStatusFilter" className="d-flex align-items-center">
                            <Form.Label className="filter-label me-2 mb-0">สถานะกิจกรรม:</Form.Label>
                            <Form.Select className="custom-form-select"value={activeEventStatusTab} onChange={handleFilterChange(setActiveEventStatusTab)}style={{ minWidth: '160px' }}>
                                <option value="all">ทั้งหมด</option>
                                <option value="สิ้นสุด">สิ้นสุด</option>
                                <option value="ยังไม่สิ้นสุด">ยังไม่สิ้นสุด</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group controlId="publishStatusFilter" className="d-flex align-items-center">
                            <Form.Label className="filter-label me-2 mb-0">สถานะการเผยแพร่:</Form.Label>
                            <Form.Select className="custom-form-select" value={activePublishStatusTab} onChange={handleFilterChange(setActivePublishStatusTab)}style={{ minWidth: '160px' }}>
                                <option value="all">ทั้งหมด</option>
                                <option value="เผยแพร่">เผยแพร่</option>
                                <option value="แบบร่าง">แบบร่าง</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <div className="action-buttons">
                        <Button variant="outline-success" className="me-2"><BsDownload /> Export Excel</Button>
                        <Button as={Link} to="/admin/manage-events/add"><BsPlusLg /> เพิ่มกิจกรรม</Button>
                    </div>
                </div>

                <Table responsive hover className="data-table">
                    <thead>
                        <tr>
                            <th>รูปหน้าปก</th>
                            <th>หัวข้อกิจกรรม</th>
                            <th>จำนวนผู้สนใจ</th>
                            <th>วันที่สร้าง</th>
                            <th>สถานะกิจกรรม</th>
                            <th>สถานะเผยแพร่</th>
                            <th>การจัดการ</th>
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
                                <td><Badge pill bg={getPublishStatusBadge(item.publishStatus)} text={item.publishStatus === 'แบบร่าง' ? 'white' : 'white'}>{item.publishStatus}</Badge></td>
                                 <td>
                                    <Link 
                                        to={`/admin/manage-events/${item.id}/registrants`}
                                        className="action-icon view-icon" 
                                        title="ดูรายชื่อผู้สนใจ"
                                    >
                                        <BsEyeFill />
                                    </Link>
                                    <Link to={`/admin/manage-events/edit/${item.id}`} className="action-icon edit-icon" title="แก้ไข">
                                        <BsPencilFill />
                                    </Link>
                                    <button className="action-icon delete-icon" title="ลบ">
                                        <BsTrashFill />
                                    </button>
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
    );
};

export default ManageEventsPage;