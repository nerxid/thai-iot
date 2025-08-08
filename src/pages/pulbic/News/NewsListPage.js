import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Spinner, Alert } from 'react-bootstrap';
import NewsCard from '../../../components/NewsCard';
import './NewsListPage.css';

const NewsListPage = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/content/posts/');
        const filteredNews = response.data
          .filter(post => post.type === 'news' && post.is_published)
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          .map(post => ({
            ...post,
            imageUrl: post.cover_image || '/images/default-news.jpg'
          }));
        setNewsPosts(filteredNews);
      } catch (err) {
        setError('ไม่สามารถโหลดข่าวสารได้');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = newsPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsPosts.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">กำลังโหลดข้อมูล...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="news-list-page">
      <Container>
        <div className="news-list-header text-center mb-5">
          <h1 className="display-4 fw-bold">ข่าวสาร</h1>
          <p className="lead text-muted">อัปเดตข้อมูลข่าวสารล่าสุด</p>
        </div>

        {currentItems.length > 0 ? (
          <>
            <Row xs={1} md={2} lg={3} className="g-4">
              {currentItems.map(newsItem => (
                <Col key={newsItem.id}>
                  <NewsCard
                    id={newsItem.id}
                    title={newsItem.title}
                    date={new Date(newsItem.published_at).toLocaleDateString('th-TH')}
                    summary={newsItem.summary || newsItem.content.replace(/<[^>]*>/g, '').substring(0, 100)}
                    src={newsItem.imageUrl}
                  />
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                  />
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">ไม่พบข่าวสารในขณะนี้</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewsListPage;