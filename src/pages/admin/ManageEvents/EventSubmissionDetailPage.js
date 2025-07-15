import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Form, Breadcrumb } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { rawEventsData } from '../../../data/mock-events';
import { mockRegistrants } from '../../../data/mock-registrants';
import '../ManageNews/ManageNewsAndEvents.css'

const SubmissionFieldRenderer = ({ field, submissionData }) => {
    const answer = submissionData[field.label] || '';

    switch (field.type) {
        case 'Paragraph':
            return <Form.Control as="textarea" rows={3} value={answer} readOnly disabled />;
        case 'Multiple choice':
            return <div className="mt-2">{field.options.map(opt => <Form.Check type="radio" key={opt.id} label={opt.value} name={`field-${field.id}`} checked={answer === opt.value} readOnly disabled />)}</div>;
        case 'Checkboxes':
            return <div className="mt-2">{field.options.map(opt => <Form.Check type="checkbox" key={opt.id} label={opt.value} checked={Array.isArray(answer) && answer.includes(opt.value)} readOnly disabled />)}</div>;
        case 'Dropdown':
            return <Form.Select value={answer} readOnly disabled><option>{answer}</option></Form.Select>;
        case 'Date':
            return <DatePicker selected={answer ? new Date(answer) : null} className="form-control" dateFormat="dd/MM/yyyy" readOnly disabled />;
        case 'Time':
            return <Form.Control type="time" value={answer} readOnly disabled />;
        case 'File upload':
            return <Button variant="outline-secondary" disabled>ดูไฟล์ที่แนบมา</Button>;
        default: // Short Answer, Email, Tel, etc.
            return <Form.Control type="text" value={answer} readOnly disabled />;
    }
};


const generalEventFieldsTemplate = [
    { id: 1, label: 'ชื่อ-นามสกุล ผู้เข้าร่วม', type: 'Short Answer', isRequired: true, options: [] },
    { id: 2, label: 'เพศ', type: 'Multiple choice', isRequired: true, options: [{ id: 1, value: 'ชาย' }, { id: 2, value: 'หญิง' }, { id: 3, value: 'ไม่ระบุ' }] },
    { id: 3, label: 'ตำแหน่งงาน', type: 'Short Answer', isRequired: false, options: [] },
    { id: 4, label: 'ชื่อหน่วยงาน/บริษัท', type: 'Short Answer', isRequired: true, options: [] },
    { id: 5, label: 'เบอร์โทรศัพท์', type: 'tel', isRequired: true, options: [] },
    { id: 6, label: 'อีเมล', type: 'email', isRequired: true, options: [] },
    { id: 7, label: 'อาหารที่แพ้', type: 'Short Answer', isRequired: false, options: [] },
    { id: 8, label: 'ยินยอมให้ใช้ข้อมูลส่วนตัว', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'ฉันได้อ่านและยอมรับเงื่อนไข' }] },
    { id: 9, label: 'ยินยอมให้ใช้ภาพถ่ายเพื่อประชาสัมพันธ์', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'ฉันได้อ่านและยอมรับเงื่อนไข' }] },
];
const boothEventFieldsTemplate = [
    { id: 1, label: 'ชื่อ-นามสกุล ผู้ประสานงานหลัก', type: 'Short Answer', isRequired: true, options: [] },
    { id: 2, label: 'เพศ', type: 'Multiple choice', isRequired: true, options: [{ id: 1, value: 'ชาย' }, { id: 2, value: 'หญิง' }, { id: 3, value: 'ไม่ระบุ' }] },
    { id: 3, label: 'ตำแหน่งงาน', type: 'Short Answer', isRequired: true, options: [] },
    { id: 4, label: 'ชื่อหน่วยงาน/บริษัท', type: 'Short Answer', isRequired: true, options: [] },
    { id: 5, label: 'เบอร์โทรศัพท์', type: 'tel', isRequired: true, options: [] },
    { id: 6, label: 'อีเมล', type: 'email', isRequired: true, options: [] },
    { id: 7, label: 'วันที่ออกบูธ (กรณีมีหลายวัน)', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'วันที่ 1' }, { id: 2, value: 'วันที่ 2' }] },
    { id: 8, label: 'จำนวนเจ้าหน้าที่ในบูธ', type: 'Short Answer', isRequired: false, options: [] },
    { id: 9, label: 'ยอมรับเงื่อนไขการจัดบูธ', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'ฉันได้อ่านและยอมรับเงื่อนไข' }] },
    { id: 10, label: 'ยินยอมให้ใช้ภาพถ่ายเพื่อประชาสัมพันธ์', type: 'Checkboxes', isRequired: true, options: [{ id: 1, value: 'ฉันได้อ่านและยอมรับเงื่อนไข' }] },
];


const EventSubmissionDetailPage = () => {
    const { eventId, registrantId } = useParams();
    const navigate = useNavigate();

    const event = useMemo(() => rawEventsData.find(e => e.id.toString() === eventId), [eventId]);
    const registrant = useMemo(() => mockRegistrants.find(r => r.id.toString() === registrantId), [registrantId]);

    const formBlueprint = useMemo(() => {
       
        if (event?.type === 'booth') {
            return boothEventFieldsTemplate;
        }
        return generalEventFieldsTemplate;
    }, [event]);

    if (!event || !registrant) {
        return <Container className="my-5 text-center"><h2>ไม่พบข้อมูล</h2></Container>;
    }

    return (
        <Container fluid className="manage-news-page p-0">
            <div className="content-wrapper p-3 p-md-4">
        <Container fluid className="manage-events-page">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/manage-events" }}>จัดการกิจกรรม</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/admin/manage-events/${eventId}/registrants` }}>รายชื่อผู้สนใจ</Breadcrumb.Item>
                <Breadcrumb.Item active>ฟอร์มที่ตอบกลับ</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="page-title">ฟอร์มที่ตอบกลับ: {registrant.firstName} {registrant.lastName}</h2>

            <Card className="data-form">
                <Card.Body>
                    {formBlueprint.map(field => (
                        <Form.Group key={field.id} className="mb-4">
                            <Form.Label as="h5" className="fw-normal">{field.label}</Form.Label>
                            <SubmissionFieldRenderer field={field} submissionData={registrant.submissionData} />
                        </Form.Group>
                    ))}
                    <div className="text-center mt-4">
                        <Button variant="primary" onClick={() => navigate(-1)}>เสร็จสิ้น</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
        </div>
        </Container>
    );
};

export default EventSubmissionDetailPage;