import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import NewsCard from '../../../components/NewsCard';
import { newsData } from '../../../data/mock-news';
import './NewsListPage.css';

const NewsListPage = () => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="news-list-page">
            <Container>
                <div className="news-list-header text-center">
                    <h1 className="display-4 fw-bold">ข่าวสาร</h1>
                    <p className="lead text-secondary">อัปเดตข้อมูลข่าวสารล่าสุดจากสมาคมไทยไอโอที</p>
                </div>
                
                <Row xs={1} md={2} lg={3} className="g-4 g-lg-5">
                    {currentItems.map(newsItem => (
                        <Col key={newsItem.id}>
                            <NewsCard
                                id={newsItem.id}
                                title={newsItem.title}
                                date={newsItem.date}
                                summary={newsItem.summary}
                                src={newsItem.imageUrl} 
                            />
                        </Col>
                    ))}
                </Row>

                <div className="d-flex justify-content-center mt-5 pt-3">
                    {totalPages > 1 && (
                        <Pagination className="custom-pagination">
                            <Pagination.Prev 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages).keys()].map(number => (
                                <Pagination.Item 
                                    key={number + 1} 
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default NewsListPage;