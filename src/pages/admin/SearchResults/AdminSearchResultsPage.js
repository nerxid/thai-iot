import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { membersData } from '../../../data/mock-members';
import { newsData } from '../../../data/mock-news';
import { rawEventsData } from '../../../data/mock-events';
import './AdminSearchResults.css';

const AdminSearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const searchResults = useMemo(() => {
        if (!query) return null;

        const members = membersData.filter(m => 
            m.firstName.toLowerCase().includes(query) || 
            m.lastName.toLowerCase().includes(query) || 
            m.email.toLowerCase().includes(query)
        );
        const news = newsData.filter(n => n.title.toLowerCase().includes(query));
        const events = rawEventsData.filter(e => e.title.toLowerCase().includes(query));

        return { members, news, events };
    }, [query]);

    if (!query) {
        return <Container className="search-results-page"><h2>กรุณาใส่คำค้นหา</h2></Container>;
    }

    const totalResults = searchResults.members.length + searchResults.news.length + searchResults.events.length;

    return (
        <Container fluid className="search-results-page">
            <h2 className="page-title">ผลการค้นหาสำหรับ: "{query}"</h2>
            <p className="text-muted">พบทั้งหมด {totalResults} รายการ</p>

            {totalResults === 0 ? (
                <Card className="p-5 text-center">
                    <h4>ไม่พบผลลัพธ์ที่ตรงกัน</h4>
                </Card>
            ) : (
                <>
                    {searchResults.members.length > 0 && (
                        <Card className="mb-4 result-card">
                            <Card.Header><h5>สมาชิก ({searchResults.members.length})</h5></Card.Header>
                            <ListGroup variant="flush">
                                {searchResults.members.map(item => (
                                    <ListGroup.Item key={`member-${item.id}`} action as={Link} to={`/admin/manage-members/${item.id}`}>
                                        {item.firstName} {item.lastName} ({item.email})
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    )}
                    {searchResults.news.length > 0 && (
                         <Card className="mb-4 result-card">
                            <Card.Header><h5>ข่าว ({searchResults.news.length})</h5></Card.Header>
                            <ListGroup variant="flush">
                                {searchResults.news.map(item => (
                                    <ListGroup.Item key={`news-${item.id}`} action as={Link} to={`/admin/manage-news/edit/${item.id}`}>
                                        {item.title}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    )}
                    {searchResults.events.length > 0 && (
                         <Card className="mb-4 result-card">
                            <Card.Header><h5>กิจกรรม ({searchResults.events.length})</h5></Card.Header>
                            <ListGroup variant="flush">
                                {searchResults.events.map(item => (
                                    <ListGroup.Item key={`event-${item.id}`} action as={Link} to={`/admin/manage-events/edit/${item.id}`}>
                                        {item.title}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    )}
                </>
            )}
        </Container>
    );
};

export default AdminSearchResultsPage;