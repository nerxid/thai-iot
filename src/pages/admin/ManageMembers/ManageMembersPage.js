import React, { useState, useMemo } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { membersData } from '../../../data/mock-members';
import AllMembersList from './AllMembersList';
import FreeMembersList from './FreeMembersList';
import PaidMembersList from './PaidMembersList';
import './ManageMembers.css';

const ManageMembersPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const { allMembers, freeMembers, paidMembers } = useMemo(() => {
        const free = membersData.filter(m => m.type === 'free');
        const paid = membersData.filter(m => m.type === 'paid');
        return { allMembers: membersData, freeMembers: free, paidMembers: paid };
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'free':
                return <FreeMembersList members={freeMembers} />;
            case 'paid':
                return <PaidMembersList members={paidMembers} />;
            case 'all':
            default:
                return <AllMembersList members={allMembers} />;
        }
    };

    return (
        <Container fluid className="manage-members-page">
            <div className="page-header">
                <h2 className="page-title">จัดการสมาชิก</h2>
            </div>

            <Nav variant="tabs" className="mb-3" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item>
                    <Nav.Link eventKey="all">ทั้งหมด</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="free">สมาชิกฟรี</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="paid">สมาชิกเสียเงิน</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="list-container">
                <div className="list-header">
                     <h4 className="mb-0">รายชื่อสมาชิก</h4>
                     <Button variant="outline-success">
                        <BsDownload /> Export Excel
                    </Button>
                </div>
                <div className="mt-4">
                    {renderContent()}
                </div>
            </div>
        </Container>
    );
};

export default ManageMembersPage;