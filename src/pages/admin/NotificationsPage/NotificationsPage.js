import React, { useState, useMemo } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { BsCheckAll, BsTrash, BsPersonPlusFill, BsCalendarEvent, BsFillEnvelopeFill } from 'react-icons/bs';
import './NotificationsPage.css';

// ข้อมูลจำลองสำหรับการแจ้งเตือนทั้งหมด
const mockAllNotifications = [
    { id: 1, icon: <BsPersonPlusFill className="text-success" />, text: "มีสมาชิกใหม่รอการอนุมัติ 2 คน", time: "10 นาทีที่แล้ว", read: false },
    { id: 2, icon: <BsCalendarEvent className="text-primary" />, text: "กิจกรรม 'IoT Expo' จะเริ่มในอีก 3 วัน", time: "1 ชั่วโมงที่แล้ว", read: false },
    { id: 3, icon: <BsFillEnvelopeFill className="text-info" />, text: "คุณมีข้อความใหม่ 1 ข้อความ", time: "เมื่อวาน", read: false },
    { id: 4, icon: <BsPersonPlusFill className="text-success" />, text: "คุณอนุมัติสมาชิก 'สมชาย ใจดี' เรียบร้อยแล้ว", time: "2 วันที่แล้ว", read: true },
    { id: 5, icon: <BsCalendarEvent className="text-secondary" />, text: "กิจกรรม 'Tech Talk' ได้สิ้นสุดลงแล้ว", time: "5 วันที่แล้ว", read: true },
    { id: 6, icon: <BsFillEnvelopeFill className="text-info" />, text: "คุณได้ตอบกลับข้อความจาก 'วิลาวรรณ'", time: "5 วันที่แล้ว", read: true },
];


const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(mockAllNotifications);
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredNotifications = useMemo(() => {
        if (activeFilter === 'unread') {
            return notifications.filter(n => !n.read);
        }
        return notifications;
    }, [notifications, activeFilter]);

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleClearAll = () => {
        if (window.confirm('คุณต้องการล้างการแจ้งเตือนทั้งหมดใช่หรือไม่?')) {
            setNotifications([]);
        }
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <Container fluid className="notifications-page p-0">
            <div className="content-wrapper p-3 p-md-4">
                <div className="page-header">
                    <h2 className="page-title">การแจ้งเตือนทั้งหมด</h2>
                </div>

                <Card className="list-container">
                    <Card.Header className="list-header">
                        <div className="filter-buttons">
                            <Button size="sm" variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('all')}>ทั้งหมด</Button>
                            <Button size="sm" variant={activeFilter === 'unread' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('unread')}>ยังไม่อ่าน</Button>
                        </div>
                        <div className="action-buttons">
                            <Button size="sm" variant="outline-info" onClick={handleMarkAllAsRead}><BsCheckAll /> ทำเครื่องหมายว่าอ่านทั้งหมด</Button>
                            <Button size="sm" variant="outline-danger" onClick={handleClearAll}><BsTrash /> ล้างทั้งหมด</Button>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="notification-list-full">
                            {filteredNotifications.length > 0 ? filteredNotifications.map(noti => (
                                <div key={noti.id} className={`notification-item-full ${noti.read ? 'read' : 'unread'}`} onClick={() => markAsRead(noti.id)}>
                                    <div className="notification-icon">{noti.icon}</div>
                                    <div className="notification-content">
                                        <p className="notification-text">{noti.text}</p>
                                        <p className="notification-time">{noti.time}</p>
                                    </div>
                                    {!noti.read && <div className="unread-dot" title="ยังไม่อ่าน"></div>}
                                </div>
                            )) : (
                                <div className="text-center text-muted p-5">ไม่มีการแจ้งเตือน</div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default NotificationsPage;