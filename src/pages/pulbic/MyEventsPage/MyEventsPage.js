import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/th';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { rawEventsData } from '../../../data/mock-events';
import EventCard from '../../../components/EventCard';
import './MyEventsPage.css';

moment.locale('th');
const localizer = momentLocalizer(moment);

const userRegisteredEventIds = [1, 3, 5, 7, 9, 10, 11, 12];

const userEvents = rawEventsData.filter(event => userRegisteredEventIds.includes(event.id));

const today = new Date();
const upcomingUserEvents = userEvents.filter(event => new Date(event.start) >= today);
const pastUserEvents = userEvents.filter(event => new Date(event.start) < today);


const MyEventsPage = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(Views.MONTH);

    useEffect(() => {
        const handleResize = () => {
            setCurrentView(window.innerWidth < 768 ? Views.AGENDA : Views.MONTH);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectEvent = (event) => navigate(`/events/${event.id}`);

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPastItems = pastUserEvents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pastUserEvents.length / ITEMS_PER_PAGE);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const calendarMessages = {
        next: "ถัดไป",
        previous: "ก่อนหน้า",
        today: "วันนี้",
        month: "เดือน",
        week: "สัปดาห์",
        day: "วัน",
        agenda: "กำหนดการ",
        noEventsInRange: "ไม่มีกิจกรรมที่ลงทะเบียนไว้ในช่วงนี้"
    };

    return (
        <div className="my-events-page">
            <Container>
                <div className="page-header-section">
                    <h1>กิจกรรมของฉัน</h1>
                    <p className="lead text-secondary">ปฏิทินกิจกรรมที่กำลังจะมาถึงและประวัติการเข้าร่วมของคุณ</p>
                </div>

                <section className="upcoming-events-section">
                    <h2 className="section-title">ปฏิทินกิจกรรมที่ลงทะเบียนไว้</h2>
                    <div className="calendar-wrapper shadow-sm">
                        <Calendar
                            localizer={localizer}
                            events={upcomingUserEvents}
                            startAccessor="start"
                            endAccessor="end"
                            culture="th"
                            messages={calendarMessages}
                            onSelectEvent={handleSelectEvent}
                            date={currentDate}
                            onNavigate={setCurrentDate}
                            view={currentView}
                            onView={setCurrentView}
                        />
                    </div>
                </section>

                <section className="past-events-section">
                    <h2 className="section-title">ประวัติการเข้าร่วมกิจกรรม</h2>
                    {currentPastItems.length > 0 ? (
                        <>
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {currentPastItems.map(event => (
                                    <Col key={event.id}>
                                        <EventCard
                                            id={event.id}
                                            title={event.title}
                                            date={new Date(event.start).toLocaleDateString('th-TH', { dateStyle: 'long' })}
                                            summary={event.summary}
                                            src={event.imageUrl}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex justify-content-center mt-5">
                                {totalPages > 1 && (
                                    <Pagination>
                                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                        {[...Array(totalPages).keys()].map(n => (
                                            <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => handlePageChange(n + 1)}>
                                                {n + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                    </Pagination>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-5 bg-light rounded-3">
                            <p className="mb-0">ยังไม่มีประวัติการเข้าร่วมกิจกรรม</p>
                        </div>
                    )}
                </section>
            </Container>
        </div>
    );
};

export default MyEventsPage;
