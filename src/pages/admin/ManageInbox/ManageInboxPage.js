import React, { useState, useMemo } from 'react';
import { Container, Button, Table, Badge, Pagination } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { mockInboxMessages } from '../../../data/mock-inbox';
import ExportInboxModal from './ExportInboxModal';
import ReplyModal from './ReplyModal';
import './ManageInbox.css';

const ManageInboxPage = () => {
    const [messages, setMessages] = useState(mockInboxMessages);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
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
            <Container fluid className="manage-inbox-page p-0">
                 <div className="content-wrapper p-3 p-md-4">
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
                            <Button variant="outline-success" onClick={() => setShowExportModal(true)}>
                                <BsDownload /> Export Excel
                            </Button>
                        </div>

                        <Table responsive hover className="inbox-table mt-4">
                            <thead>
                                <tr>
                                    <th className="d-none d-md-table-cell">วันที่</th>
                                    <th>ชื่อ-นามสกุล</th>
                                    <th>หัวข้อ</th>
                                    <th className="d-none d-sm-table-cell">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(msg => (
                                    <React.Fragment key={msg.id}>
                                        <tr onClick={() => handleRowClick(msg.id)} className="message-row">
                                            <td className="d-none d-md-table-cell">{msg.date}</td>
                                            <td>{msg.senderName}</td>
                                            <td>{msg.subject}</td>
                                            <td className="d-none d-sm-table-cell"><Badge pill bg={statusMap[msg.status]}>{msg.status}</Badge></td>
                                        </tr>
                                        {expandedRowId === msg.id && (
                                            <tr className="expanded-row">
                                                <td colSpan={4}> 
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
                         <div className="d-flex justify-content-center mt-4">
                            {totalPages > 1 && (
                                <Pagination>
                                    <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
                                    {[...Array(totalPages).keys()].map(n => (
                                        <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
                                            {n + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
                                </Pagination>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            
            <ReplyModal 
                show={showReplyModal}
                onHide={() => setShowReplyModal(false)}
                messageData={replyingTo}
                onSend={handleSendReply}
            />

            <ExportInboxModal
                show={showExportModal}
                onHide={() => setShowExportModal(false)}
                messages={messages}
            />
        </>
    );
};

export default ManageInboxPage;