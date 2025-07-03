import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Breadcrumb, Button, Table, Pagination } from 'react-bootstrap';
import { BsEyeFill, BsDownload } from 'react-icons/bs';
import './ManageEvents.css'; 
import { rawEventsData } from '../../../data/mock-events';
import { mockRegistrants } from '../../../data/mock-registrants';

const EventRegistrantsPage = () => {
    const { eventId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // ค้นหากิจกรรมที่เลือกจาก eventId
    const event = useMemo(() => 
        rawEventsData.find(e => e.id.toString() === eventId), 
    [eventId]);

    // กรองรายชื่อผู้ลงทะเบียนเฉพาะของกิจกรรมนี้
    const registrantsForEvent = useMemo(() => 
        mockRegistrants.filter(r => r.eventId.toString() === eventId), 
    [eventId]);

    const totalPages = Math.ceil(registrantsForEvent.length / ITEMS_PER_PAGE);
    const currentItems = registrantsForEvent.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (!event) {
        return <Container className="my-5 text-center"><h2>ไม่พบข้อมูลกิจกรรม</h2></Container>;
    }

    return (
        <Container fluid className="manage-events-page">
            <div className="page-header">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/manage-events" }}>จัดการกิจกรรม</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายชื่อผู้สนใจ</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className="page-title">{event.title}</h2>
                <p className="text-muted">{event.summary}</p>
            </div>

            <div className="list-container">
                <div className="list-header">
                    <h4 className="mb-0">รายชื่อผู้สนใจ ({registrantsForEvent.length} คน)</h4>
                    <Button variant="outline-success">
                        <BsDownload /> Export Excel
                    </Button>
                </div>
                
                <Table responsive hover className="data-table mt-3">
                    <thead>
                        <tr>
                            <th>คำนำหน้า</th>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>วันที่ส่งฟอร์ม</th>
                            <th>E-mail</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(registrant => (
                            <tr key={registrant.id}>
                                <td>{registrant.prefix}</td>
                                <td>{registrant.firstName}</td>
                                <td>{registrant.lastName}</td>
                                <td>{registrant.submissionDate}</td>
                                <td>{registrant.email}</td>
                                <td>
                                    <Link 
                                        to={`/admin/manage-events/${eventId}/registrants/${registrant.id}`}
                                        className="action-icon view-icon" 
                                        title="ดูข้อมูลการลงทะเบียน"
                                    >
                                        <BsEyeFill />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {totalPages > 1 && (
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map(n => (
                                <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => handlePageChange(n + 1)}>{n + 1}</Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default EventRegistrantsPage;