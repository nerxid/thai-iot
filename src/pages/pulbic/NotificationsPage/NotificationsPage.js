import React, { useState } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NotificationsPage.css';

const NotificationsPage = () => {
    // ใช้ข้อมูลจำลองชุดเดียวกับใน Navbar เพื่อความสอดคล้องกัน
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'มีข่าวใหม่จากสมาคม!', link: '/news/1', read: false, date: '2024-10-26' },
        { id: 2, text: 'กิจกรรม I² Starter Kit ใกล้เต็มแล้ว', link: '/events/2', read: false, date: '2024-10-25' },
        { id: 3, text: 'ยินดีต้อนรับ! ขอบคุณที่สมัครเป็นสมาชิก', link: '/profile', read: true, date: '2024-10-24' },
        { id: 4, text: 'สมาชิกของคุณจะหมดอายุในอีก 30 วัน', link: '/profile', read: true, date: '2024-10-22' },
    ]);

    // ฟังก์ชันสำหรับกดแล้วเปลี่ยนสถานะเป็น "อ่านแล้ว"
    const markAsRead = (clickedId) => {
        setNotifications(
            notifications.map(n => n.id === clickedId ? { ...n, read: true } : n)
        );
    };

    return (
        <Container className="notifications-page-container my-5">
            <h1 className="notifications-page-title mb-4">การแจ้งเตือนทั้งหมด</h1>
            <ListGroup className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <ListGroup.Item
                            key={n.id}
                            as={NavLink}
                            to={n.link}
                            onClick={() => markAsRead(n.id)}
                            className={`notification-list-item ${!n.read ? 'unread' : ''}`}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">{n.text}</p>
                                {!n.read && <Badge pill bg="primary">ใหม่</Badge>}
                            </div>
                            <small className="text-muted">
                                {new Date(n.date).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </small>
                        </ListGroup.Item>
                    ))
                ) : (
                    <p>ยังไม่มีการแจ้งเตือน</p>
                )}
            </ListGroup>
        </Container>
    );
};

export default NotificationsPage;