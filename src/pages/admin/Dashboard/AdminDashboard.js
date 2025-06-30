import React, { useState } from 'react';
import './AdminDashboard.css';
import StatCard from '../Dashboard/StatCard.js'; 

import { FaUsers, FaEye, FaUserCheck, FaEnvelope, FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const summaryData = [
    { title: "จำนวนสมาชิก (ทั้งหมด)", value: "120", trend: "+ 5", trendDirection: 'up', icon: <FaUsers />, theme: 'theme-blue' },
    { title: "จำนวนผู้เข้าชมเว็บไซต์", value: "200", trend: "+ 12", trendDirection: 'up', icon: <FaEye />, theme: 'theme-green' },
    { title: "จำนวนสมาชิกที่รอการอนุมัติ", value: "20", trend: "- 1", trendDirection: 'down', icon: <FaUserCheck />, theme: 'theme-yellow' },
    { title: "จำนวนแบบฟอร์มที่ติดต่อมา", value: "20", trend: "+ 3", trendDirection: 'up', icon: <FaEnvelope />, theme: 'theme-pink' },
];

const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: '#6b7280', usePointStyle: true, boxWidth: 8 } },
        tooltip: { backgroundColor: '#111827', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 12, cornerRadius: 8 }
    },
    scales: {
        y: { border: { display: false }, grid: { color: '#e5e7eb' }, ticks: { color: '#6b7280' } },
        x: { grid: { display: false }, ticks: { color: '#6b7280' } }
    }
};
const stackedBarChartOptions = { ...commonChartOptions, scales: { ...commonChartOptions.scales, x: {...commonChartOptions.scales.x, stacked: true }, y: {...commonChartOptions.scales.y, stacked: true }} };
const barChartOptions = { ...commonChartOptions, plugins: {...commonChartOptions.plugins, legend: { display: false } } };
const groupedBarChartOptions = { ...commonChartOptions };
const lineChartOptions = { ...commonChartOptions, elements: { line: { tension: 0.4 }, point: { radius: 0 } }, plugins: {...commonChartOptions.plugins, legend: { display: false } } };

const doughnutChartOptions = { 
    ...commonChartOptions, 
    cutout: '80%', 
    plugins: {...commonChartOptions.plugins, legend: { position: 'right' } },
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        }
    }
};

// --- Mock Data ---
const pastelChartColors = {
  blue: '#a0c4ff',
  green: '#a8d8b9',
  yellow: '#fceeb5',
  pink: '#fbc6d0',
  purple: '#c7b9e8',
  grey: '#d1d5db'
};
const memberRegistrationDataDay = { labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], datasets: [ { label: 'นิติบุคคล', data: [1, 2, 1, 3, 2, 4, 3], backgroundColor: pastelChartColors.green }, { label: 'วิสามัญ', data: [2, 3, 2, 2, 4, 3, 5], backgroundColor: pastelChartColors.yellow }, { label: 'สามัญ', data: [1, 0, 2, 1, 1, 2, 1], backgroundColor: pastelChartColors.pink }, { label: 'ทั่วไป', data: [5, 6, 4, 7, 5, 8, 9], backgroundColor: pastelChartColors.blue } ] };
const memberRegistrationDataMonth = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'], datasets: [ { label: 'นิติบุคคล', data: [5, 8, 10, 12, 15, 20], backgroundColor: pastelChartColors.green }, { label: 'วิสามัญ', data: [10, 12, 15, 18, 20, 20], backgroundColor: pastelChartColors.yellow }, { label: 'สามัญ', data: [2, 3, 5, 8, 10, 20], backgroundColor: pastelChartColors.pink }, { label: 'ทั่วไป', data: [20, 25, 30, 40, 50, 60], backgroundColor: pastelChartColors.blue } ] };
const memberRegistrationDataYear = { labels: ['2566', '2567', '2568'], datasets: [ { label: 'นิติบุคคล', data: [50, 65, 80], backgroundColor: pastelChartColors.green }, { label: 'วิสามัญ', data: [80, 100, 120], backgroundColor: pastelChartColors.yellow }, { label: 'สามัญ', data: [30, 45, 55], backgroundColor: pastelChartColors.pink }, { label: 'ทั่วไป', data: [150, 180, 220], backgroundColor: pastelChartColors.blue } ] };
const monthlyLoginData = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.'], datasets: [{ label: 'จำนวนการเข้าสู่ระบบ', data: [150, 220, 250, 310, 350, 400, 420, 450], backgroundColor: pastelChartColors.blue, borderRadius: 4 }] };
const memberPlanData = { labels: ['นิติบุคคล (30)', 'วิสามัญ (50)', 'สามัญ (20)', 'ทั่วไป (30)'], datasets: [{ data: [30, 50, 20, 30], backgroundColor: [pastelChartColors.green, pastelChartColors.yellow, pastelChartColors.pink, pastelChartColors.blue], borderColor: '#ffffff', borderWidth: 4 }] };
const membershipRevenueData = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.'], datasets: [{ label: 'รายได้', data: [15000, 18000, 25000, 22000, 30000, 28000, 35000], borderColor: pastelChartColors.purple, backgroundColor: 'rgba(199, 185, 232, 0.2)', fill: true }] };
const weeklyPostData = { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [ { label: 'ข่าว', data: [20, 20, 20, 20, 20, 20, 20], backgroundColor: pastelChartColors.blue }, { label: 'กิจกรรม', data: [33, 32, 32, 32, 32, 32, 32], backgroundColor: pastelChartColors.grey } ] };
const topActivities = [ { id: 1, name: 'โครงการอบรมเชิงปฏิบัติด้าน IoT', popular: 50 }, { id: 2, name: 'การเขียนโปรแกรม Python สำหรับ IoT', popular: 45 }, { id: 3, name: 'ความปลอดภัยในระบบ IoT', popular: 42 }, { id: 4, name: 'Data Analytics for IoT', popular: 38 }, { id: 5, name: 'การสร้างระบบ Smart Home', popular: 35 } ];
const expiringMembersByTimeData = { labels: ['< 7 วัน', '< 14 วัน', '< 30 วัน', '> 30 วัน'], datasets: [{ label: 'จำนวนสมาชิก', data: [1, 2, 4, 6], backgroundColor: [pastelChartColors.pink, pastelChartColors.yellow, pastelChartColors.green, pastelChartColors.blue], borderRadius: 4 }] };
const expiringAnnualMembers = [ { id: 1, name: 'วิลาวรรณ สุขใจ', expires: '1 ก.ค. 2568', remaining: 7 }, { id: 2, name: 'สมศักดิ์ รักดี', expires: '10 ก.ค. 2568', remaining: 14 }, { id: 3, name: 'อารยา เอี่ยมสะอาด', expires: '20 ก.ค. 2568', remaining: 30 }, { id: 4, name: 'Peter Parker', expires: '20 ส.ค. 2568', remaining: 51 } ];

const AdminDashboard = () => {
    const [memberChartTimeframe, setMemberChartTimeframe] = useState('เดือน');
    const getActiveMemberChartData = () => {
        switch (memberChartTimeframe) {
            case 'วัน': return memberRegistrationDataDay;
            case 'ปี': return memberRegistrationDataYear;
            default: return memberRegistrationDataMonth;
        }
    };
    const getStatusButton = (remaining) => {
        if (remaining <= 7) return <button className="status-button status-danger">เหลือ {remaining} วัน</button>;
        if (remaining <= 30) return <button className="status-button status-warning">เหลือ {remaining} วัน</button>;
        return <button className="status-button status-success">ปกติ</button>;
    };

    return (
        <div className="admin-dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="summary-cards-container">
                {summaryData.map((card, index) => (
                    <StatCard 
                        key={index}
                        title={card.title}
                        value={card.value}
                        trend={card.trend}
                        trendDirection={card.trendDirection}
                        icon={card.icon}
                        theme={card.theme}
                    />
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="dash-card grid-col-span-6">
                    <div className="card-header">
                        <h3 className="card-title">จำนวนการสมัครสมาชิก</h3>
                        <div className="timeframe-filter">
                            <button onClick={() => setMemberChartTimeframe('วัน')} className={memberChartTimeframe === 'วัน' ? 'active' : ''}>วัน</button>
                            <button onClick={() => setMemberChartTimeframe('เดือน')} className={memberChartTimeframe === 'เดือน' ? 'active' : ''}>เดือน</button>
                            <button onClick={() => setMemberChartTimeframe('ปี')} className={memberChartTimeframe === 'ปี' ? 'active' : ''}>ปี</button>
                        </div>
                    </div>
                    <div className="chart-container"><Bar options={stackedBarChartOptions} data={getActiveMemberChartData()} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">จำนวนการเข้าสู่ระบบในแต่ละเดือน</h3></div>
                    <div className="chart-container"><Bar options={barChartOptions} data={monthlyLoginData} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">จำนวนสมาชิกในแต่ละแผน</h3></div>
                    <div className="chart-container"><Doughnut options={doughnutChartOptions} data={memberPlanData} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">รายได้จากการสมัครสมาชิก</h3></div>
                    <div className="chart-container"><Line options={lineChartOptions} data={membershipRevenueData} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">โพสต์ข่าวและกิจกรรม (รายสัปดาห์)</h3></div>
                    <div className="chart-container"><Bar options={groupedBarChartOptions} data={weeklyPostData} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">5 อันดับ กิจกรรมยอดนิยม</h3></div>
                    <table className="dashboard-table">
                        <thead><tr><th>อันดับ</th><th>ชื่อกิจกรรม</th><th>ผู้ลงทะเบียน</th></tr></thead>
                        <tbody>{topActivities.map((act, index) => (<tr key={act.id}><td>{index + 1}</td><td>{act.name}</td><td>{act.popular}</td></tr>))}</tbody>
                    </table>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">สมาชิกที่ใกล้หมดอายุ</h3></div>
                    <div className="chart-container"><Bar options={barChartOptions} data={expiringMembersByTimeData} /></div>
                </div>
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">รายชื่อสมาชิกที่ใกล้หมดอายุรายปี</h3></div>
                    <table className="dashboard-table">
                        <thead><tr><th>ชื่อสมาชิก</th><th>วันหมดอายุ</th><th>สถานะ</th></tr></thead>
                        <tbody>{expiringAnnualMembers.map((member) => (<tr key={member.id}><td>{member.name}</td><td>{member.expires}</td><td>{getStatusButton(member.remaining)}</td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;