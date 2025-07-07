import React, { useState, useMemo } from 'react';
import { Container, Button, Table, Badge, Pagination } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { mockInboxMessages } from '../../../data/mock-inbox';
import ReplyModal from './ReplyModal';
import './ManageInbox.css';

const ManageInboxPage = () => {
    const [messages, setMessages] = useState(mockInboxMessages);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const ITEMS_PER_PAGE = 10;

    const filteredMessages = useMemo(() => {
        if (activeFilter === 'all') return messages;
        return messages.filter(msg => msg.status.toLowerCase() === activeFilter.toLowerCase());
    }, [messages, activeFilter]);
    
    const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
    const currentItems = filteredMessages.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleRowClick = (messageId) => {
        setExpandedRowId(prevId => (prevId === messageId ? null : messageId));
        setMessages(prev => prev.map(msg => 
            (msg.id === messageId && msg.status === 'ใหม่') ? { ...msg, status: 'อ่านแล้ว' } : msg
        ));
    };

    const handleOpenReplyModal = (message) => {
        setReplyingTo(message);
        setShowReplyModal(true);
    };

    const handleSendReply = (replyText) => {
        console.log(`Sending reply to ${replyingTo.senderEmail}:`, replyText);
        alert(`ตอบกลับข้อความถึง ${replyingTo.senderName} เรียบร้อยแล้ว`);
        setMessages(prev => prev.map(msg => 
            msg.id === replyingTo.id ? { ...msg, status: 'ตอบแล้ว' } : msg
        ));
        setReplyingTo(null);
    };

    const statusMap = { 'ใหม่': 'danger', 'อ่านแล้ว': 'warning', 'ตอบแล้ว': 'success' };

    return (
        <>
            <Container fluid className="manage-inbox-page">
                <div className="page-header">
                    <h2 className="page-title">จัดการข้อความติดต่อ</h2>
                </div>
                <div className="list-container">
                    <div className="list-header">
                        <div className="filter-buttons">
                            <Button variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('all')}>ทั้งหมด</Button>
                            <Button variant={activeFilter === 'ใหม่' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('ใหม่')}>ใหม่</Button>
                            <Button variant={activeFilter === 'อ่านแล้ว' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('อ่านแล้ว')}>อ่านแล้ว</Button>
                            <Button variant={activeFilter === 'ตอบแล้ว' ? 'primary' : 'outline-secondary'} onClick={() => setActiveFilter('ตอบแล้ว')}>ตอบแล้ว</Button>
                        </div>
                        <Button variant="outline-success"><BsDownload /> Export Excel</Button>
                    </div>

                    <Table hover className="inbox-table mt-4">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>ชื่อ-นามสกุล</th>
                                <th>หัวข้อ</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(msg => (
                                <React.Fragment key={msg.id}>
                                    <tr onClick={() => handleRowClick(msg.id)} className="message-row">
                                        <td>{msg.date}</td>
                                        <td>{msg.senderName}</td>
                                        <td>{msg.subject}</td>
                                        <td><Badge pill bg={statusMap[msg.status]}>{msg.status}</Badge></td>
                                    </tr>
                                    {expandedRowId === msg.id && (
                                        <tr className="expanded-row">
                                            <td colSpan="4">
                                                <div className="expanded-content">
                                                    <p><strong>จาก:</strong> {msg.senderName} ({msg.senderEmail})</p>
                                                    <p><strong>เบอร์โทร:</strong> {msg.senderPhone}</p>
                                                    <p className="message-body">{msg.message}</p>
                                                    <Button size="sm" variant="primary" onClick={() => handleOpenReplyModal(msg)}>ตอบกลับ</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            
            <ReplyModal 
                show={showReplyModal}
                onHide={() => setShowReplyModal(false)}
                messageData={replyingTo}
                onSend={handleSendReply}
            />
        </>
    );
};

export default ManageInboxPage;