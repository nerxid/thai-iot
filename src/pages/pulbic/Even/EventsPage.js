import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/th';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../../context/AuthContext';
import EventCard from '../../../components/EventCard';
import './EventsPage.css';

moment.locale('th');
const localizer = momentLocalizer(moment);

const EventsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/content/posts/');
                // Filter only published events and map to required format
                const formattedEvents = response.data
                    .filter(post => post.is_published && post.type === 'event')
                    .map(post => ({
                        id: post.id,
                        title: post.title,
                        summary: post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...', // Remove HTML tags and truncate
                        start: new Date(post.published_at),
                        end: new Date(new Date(post.published_at).getTime() + 2 * 60 * 60 * 1000), // Add 2 hours as default duration
                        imageUrl: post.cover_image || (post.images.length > 0 ? post.images[0].image : ''),
                        type: post.type
                    }));
                setEvents(formattedEvents);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            if (event.type === 'booth') {
                // If it's a Booth event, user must be logged in and corporate
                return user && user.memberType === 'corporate';
            }
            return true; // Show all other events
        });
    }, [user, events]);

    const eventsForCalendar = filteredEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(Views.MONTH);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCurrentView(Views.AGENDA);
            } else {
                setCurrentView(Views.MONTH);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectEvent = (event) => {
        navigate(`/events/${event.id}`);
    };

    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (newView) => {
        setCurrentView(newView);
    };

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentCardItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        const eventListElement = document.getElementById('event-list-section');
        if (eventListElement) {
            eventListElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const calendarMessages = {
        next: "ถัดไป",
        previous: "ก่อนหน้า",
        today: "วันนี้",
        month: "เดือน",
        week: "สัปดาห์",
        day: "วัน",
        agenda: "กำหนดการ",
        noEventsInRange: "ไม่มีกิจกรรมในช่วงนี้"
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">กำลังโหลดข้อมูลกิจกรรม...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <div className="alert alert-danger">
                    เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}
                </div>
            </Container>
        );
    }

    return (
        <div className="events-page">
            <Container fluid="xl">
                <div className="events-page-header">
                    <h1>ปฏิทินกิจกรรม</h1>
                    <p className="lead text-secondary">ติดตามกิจกรรม สัมมนา และการอบรมที่น่าสนใจจากเรา</p>
                </div>

                <div className="calendar-container shadow-sm">
                    <Calendar
                        localizer={localizer}
                        events={eventsForCalendar}
                        startAccessor="start"
                        endAccessor="end"
                        culture="th"
                        messages={calendarMessages}
                        onSelectEvent={handleSelectEvent}
                        date={currentDate}
                        onNavigate={handleNavigate}
                        view={currentView}
                        onView={handleViewChange}
                    />
                </div>

                <div id="event-list-section" className="event-list-container">
                    <div className="events-page-header">
                        <h2>รายการกิจกรรมทั้งหมด</h2>
                    </div>
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-5">
                            <p>ไม่มีกิจกรรมในขณะนี้</p>
                        </div>
                    ) : (
                        <>
                            <Row xs={1} md={2} lg={3} className="g-4 g-lg-5">
                                {currentCardItems.map(event => ( 
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

                            <div className="d-flex justify-content-center mt-5 pt-3">
                                {totalPages > 1 && (
                                    <Pagination className="custom-pagination">
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
                    )}
                </div>
            </Container>
        </div>
    );
};

export default EventsPage;