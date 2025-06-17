import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'; 
import moment from 'moment';
import 'moment/locale/th';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { rawEventsData } from '../../../data/mock-events';
import EventCard from '../../../components/EventCard';

moment.locale('th');
const localizer = momentLocalizer(moment);

const eventsForCalendar = rawEventsData.map(event => ({
    ...event,
    start: new Date(event.start),
    end: moment(event.end).add(1, 'days').toDate(),
}));


const EventsPage = () => {
    const navigate = useNavigate();
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(Views.MONTH); 

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
    const currentCardItems = rawEventsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rawEventsData.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={{ backgroundColor: '#f9fafb', padding: '40px 0' }}>
            <Container >
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '2rem', color: '#1e3a8a' }}>
                    ปฏิทินกิจกรรม
                </h1>


                <div style={{ height: '80vh', marginBottom: '2rem' }}>
                    <Calendar
                        localizer={localizer}
                        events={eventsForCalendar}
                        startAccessor="start"
                        endAccessor="end"
                        culture="th"
                        messages={{
                            next: "ถัดไป",
                            previous: "ก่อนหน้า",
                            today: "วันนี้",
                            month: "เดือน",
                            week: "สัปดาห์",
                            day: "วัน",
                        }}
                        onSelectEvent={handleSelectEvent}

                        date={currentDate}
                        onNavigate={handleNavigate}

                        view={currentView}         
                        onView={handleViewChange}  
                    />
                </div>

                <hr className="my-5" />


                <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '2.5rem', color: '#1e3a8a' }}>
                    รายการกิจกรรมทั้งหมด
                </h2>
                <Row xs={1} md={2} lg={3} className="g-4">
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

            </Container>
        </div>
    );
};

export default EventsPage;