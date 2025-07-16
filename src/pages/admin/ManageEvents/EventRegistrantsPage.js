import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Breadcrumb, Button, Table, Pagination } from 'react-bootstrap';
import { BsEyeFill, BsDownload } from 'react-icons/bs';
import * as XLSX from 'xlsx';
import '../ManageNews/ManageNewsAndEvents.css'
import { rawEventsData } from '../../../data/mock-events';
import { mockRegistrants } from '../../../data/mock-registrants';

const generalEventFieldsTemplate = [
    { id: 1, label: 'ชื่อ-นามสกุล ผู้เข้าร่วม' },
    { id: 2, label: 'เพศ' },
    { id: 3, label: 'ตำแหน่งงาน' },
    { id: 4, label: 'ชื่อหน่วยงาน/บริษัท' },
    { id: 5, label: 'เบอร์โทรศัพท์' },
    { id: 6, label: 'อีเมล' },
    { id: 7, label: 'อาหารที่แพ้' },
    { id: 8, label: 'ยินยอมให้ใช้ข้อมูลส่วนตัว' },
    { id: 9, label: 'ยินยอมให้ใช้ภาพถ่ายเพื่อประชาสัมพันธ์' },
];
const boothEventFieldsTemplate = [
    { id: 1, label: 'ชื่อ-นามสกุล ผู้ประสานงานหลัก' },
    { id: 2, label: 'เพศ' },
    { id: 3, label: 'ตำแหน่งงาน' },
    { id: 4, label: 'ชื่อหน่วยงาน/บริษัท' },
    { id: 5, label: 'เบอร์โทรศัพท์' },
    { id: 6, label: 'อีเมล' },
    { id: 7, label: 'วันที่ออกบูธ (กรณีมีหลายวัน)' },
    { id: 8, label: 'จำนวนเจ้าหน้าที่ในบูธ' },
    { id: 9, label: 'ยอมรับเงื่อนไขการจัดบูธ' },
    { id: 10, label: 'ยินยอมให้ใช้ภาพถ่ายเพื่อประชาสัมพันธ์' },
];


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

    const formBlueprint = useMemo(() => { // หาโครงสร้างฟอร์มของ Event นี้
        if (event?.type === 'booth' || event?.type === 'ออกบูธ') {
            return boothEventFieldsTemplate;
        }
        return generalEventFieldsTemplate;
    }, [event]);

    const handleExportRegistrants = () => {
        if (!event || registrantsForEvent.length === 0) {
            alert("ไม่มีข้อมูลผู้ลงทะเบียนสำหรับกิจกรรมนี้");
            return;
        }

        // สร้างข้อมูลสำหรับ Excel แบบไดนามิก
        const dataForExcel = registrantsForEvent.map(registrant => {
            const rowData = {};
            // วนลูปตามโครงสร้างฟอร์มเพื่อดึงข้อมูลคำตอบ
            formBlueprint.forEach(field => {
                const answer = registrant.submissionData[field.label] || '';
                // ถ้าคำตอบเป็น Array (เช่นจาก Checkbox) ให้แปลงเป็นสตริง
                rowData[field.label] = Array.isArray(answer) ? answer.join(', ') : answer;
            });
            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrants");
        
        // ตั้งชื่อไฟล์ให้มีชื่อกิจกรรมด้วย
        const safeEventTitle = event.title.replace(/[^a-z0-9]/gi, '_').slice(0, 20);
        XLSX.writeFile(workbook, `Registrants_${safeEventTitle}.xlsx`);
    };

    const totalPages = Math.ceil(registrantsForEvent.length / ITEMS_PER_PAGE);
    const currentItems = registrantsForEvent.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (!event) {
        return <Container className="my-5 text-center"><h2>ไม่พบข้อมูลกิจกรรม</h2></Container>;
    }

    return (
        <Container fluid className="manage-news-page p-0">
            <div className="content-wrapper p-3 p-md-4">
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
                    {/* << 5. แก้ไขปุ่ม Export ให้เรียกใช้ฟังก์ชันใหม่ */}
                    <Button variant="outline-success" onClick={handleExportRegistrants}>
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
        </div>
        </Container>
    );
};

export default EventRegistrantsPage;