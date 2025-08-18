import React, { useState, useMemo } from 'react';
import './AdminDashboard.css';
import StatCard from '../Dashboard/StatCard.js';

// --- Import ไอคอนจาก library 'react-icons' ---
import { FaUsers, FaEye, FaUserCheck, FaEnvelope, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// --- Import Chart.js และ components กราฟจาก 'react-chartjs-2' ---
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { membersData } from '../../../data/mock-members'; // สมมติว่านี่คือข้อมูลสมาชิกทั้งหมดจากไฟล์อื่น

// --- ลงทะเบียน components ของ Chart.js เพื่อให้ใช้งานได้ ---
// ต้องทำขั้นตอนนี้เพื่อบอก Chart.js ว่าเราจะใช้ส่วนประกอบอะไรบ้าง เช่น แกน X/Y, กราฟแท่ง, คำอธิบาย ฯลฯ
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);


// --- Mock Data (ข้อมูลจำลองสำหรับแสดงผลบนการ์ดสรุป) ---
const summaryData = [
    { title: "จำนวนสมาชิก (ทั้งหมด)", value: "120", trend: "+ 5", trendDirection: 'up', icon: <FaUsers />, theme: 'theme-blue' },
    { title: "จำนวนผู้เข้าชมเว็บไซต์", value: "200", trend: "+ 12", trendDirection: 'up', icon: <FaEye />, theme: 'theme-green' },
    { title: "จำนวนสมาชิกที่รอการอนุมัติ", value: "20", trend: "- 1", trendDirection: 'down', icon: <FaUserCheck />, theme: 'theme-yellow' },
    { title: "จำนวนแบบฟอร์มที่ติดต่อมา", value: "20", trend: "+ 3", trendDirection: 'up', icon: <FaEnvelope />, theme: 'theme-pink' },
];

// --- Chart Options (การตั้งค่าการแสดงผลของกราฟ) ---
// สร้าง object กลางสำหรับเก็บค่าที่ใช้ร่วมกันในกราฟส่วนใหญ่ เพื่อลดการเขียนโค้ดซ้ำ
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: { color: '#6b7280', usePointStyle: true, boxWidth: 8 }
        },
        tooltip: {
            backgroundColor: '#111827',
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 8,
            bodySpacing: 4,
            footerSpacing: 8,
            titleSpacing: 6,
        }
    },
    scales: {
        y: {
            border: { display: false },
            grid: { color: '#e5e7eb' },
            ticks: { color: '#6b7280' }
        },
        x: {
            grid: { display: false },
            ticks: { color: '#6b7280' }
        }
    }
};

// ตั้งค่าสำหรับกราฟแท่งแบบซ้อนกัน (Stacked Bar Chart)
const groupedStackedBarChartOptions = {
    ...commonChartOptions, // คัดลอกค่าทั้งหมดจาก commonChartOptions มาก่อน
    scales: {
        ...commonChartOptions.scales,
        x: {
            ...commonChartOptions.scales.x,
            stacked: true // ตั้งค่าให้แกน X ซ้อนกันได้
        },
        y: {
            ...commonChartOptions.scales.y,
            stacked: true // ตั้งค่าให้แกน Y ซ้อนกันได้
        }
    },
};

// ตั้งค่าสำหรับกราฟแท่งธรรมดา (ซ่อน Legend)
const barChartOptions = { ...commonChartOptions, plugins: {...commonChartOptions.plugins, legend: { display: false } } };

// ตั้งค่าสำหรับกราฟโดนัท (กำหนดขนาดรูตรงกลาง, ย้าย Legend ไปทางขวา, และซ่อนแกน X/Y)
const doughnutChartOptions = { ...commonChartOptions, cutout: '80%', plugins: {...commonChartOptions.plugins, legend: { position: 'right' } },scales: {x: {display: false,},y: {display: false,}}};


// --- ชุดสีและข้อมูลสำหรับกราฟต่างๆ ---
const pastelChartColors = { blue: '#a0c4ff', green: '#a8d8b9', yellow: '#fceeb5', pink: '#fbc6d0', purple: '#c7b9e8', grey: '#d1d5db' };

// --- ข้อมูลกราฟ: จำนวนการสมัครสมาชิก (รายวัน/เดือน/ปี) ---
const memberRegistrationDataDay = { labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], datasets: [ { label: 'นิติบุคคล', data: [1, 2, 1, 3, 2, 4, 3], backgroundColor: pastelChartColors.green, stack: 'components' }, { label: 'วิสามัญ', data: [2, 3, 2, 2, 4, 3, 5], backgroundColor: pastelChartColors.yellow, stack: 'components' }, { label: 'สามัญ', data: [1, 0, 2, 1, 1, 2, 1], backgroundColor: pastelChartColors.pink, stack: 'components' }, { label: 'ทั่วไป', data: [5, 6, 4, 7, 5, 8, 9], backgroundColor: pastelChartColors.blue, stack: 'components' } ] };
const memberRegistrationDataMonth = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], datasets: [ { label: 'นิติบุคคล', data: [5, 8, 10, 12, 15, 20, 22, 25, 28, 30, 32, 35], backgroundColor: pastelChartColors.green, stack: 'components' }, { label: 'วิสามัญ', data: [10, 12, 15, 18, 20, 20, 24, 26, 30, 33, 35, 38], backgroundColor: pastelChartColors.yellow, stack: 'components' }, { label: 'สามัญ', data: [2, 3, 5, 8, 10, 20, 21, 22, 24, 25, 28, 30], backgroundColor: pastelChartColors.pink, stack: 'components' }, { label: 'ทั่วไป', data: [20, 25, 30, 40, 50, 60, 65, 70, 75, 80, 85, 90], backgroundColor: pastelChartColors.blue, stack: 'components' } ] };
const memberRegistrationDataYear = { labels: ['2566', '2567', '2568'], datasets: [ { label: 'นิติบุคคล', data: [50, 65, 80], backgroundColor: pastelChartColors.green, stack: 'components' }, { label: 'วิสามัญ', data: [80, 100, 120], backgroundColor: pastelChartColors.yellow, stack: 'components' }, { label: 'สามัญ', data: [30, 45, 55], backgroundColor: pastelChartColors.pink, stack: 'components' }, { label: 'ทั่วไป', data: [150, 180, 220], backgroundColor: pastelChartColors.blue, stack: 'components' } ] };

// --- ข้อมูลกราฟ: การเข้าสู่ระบบ (รายวัน/เดือน/ปี) ---
const monthlyLoginDataDay = { labels: ['จ','อ','พ','พฤ','ศ','ส','อา'], datasets: [{ label: 'เข้าสู่ระบบ', data: [50, 60, 55, 70, 80, 120, 150], backgroundColor: pastelChartColors.blue, borderRadius: 4 }] };
const monthlyLoginDataMonth = { labels: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'], datasets: [{ label: 'เข้าสู่ระบบ', data: [150, 220, 250, 310, 350, 400, 420, 450, 430, 480, 520, 600], backgroundColor: pastelChartColors.blue, borderRadius: 4 }] };
const monthlyLoginDataYear = { labels: ['2566', '2567', '2568'], datasets: [{ label: 'เข้าสู่ระบบ', data: [3500, 5200, 4800], backgroundColor: pastelChartColors.blue, borderRadius: 4 }] };

// --- ข้อมูลกราฟ: สัดส่วนแผนสมาชิก (สำหรับกราฟโดนัท) ---
const memberPlanData = { labels: ['นิติบุคคล (30)', 'วิสามัญ (50)', 'สามัญ (20)', 'ทั่วไป (30)'], datasets: [{ data: [30, 50, 20, 30], backgroundColor: [pastelChartColors.green, pastelChartColors.yellow, pastelChartColors.pink, pastelChartColors.blue], borderColor: '#ffffff', borderWidth: 4 }] };

// --- ฟังก์ชัน Helper สำหรับสร้างข้อมูลกราฟรายได้ ---
const createRevenueData = (paid, pendingPayment, pendingDocs) => {
    // ฟังก์ชันนี้รับ array ของข้อมูล 3 ชุด แล้วสร้างเป็นโครงสร้าง dataset ที่ Chart.js ต้องการ
    const totals = paid.map((val, i) => val + pendingPayment[i] + pendingDocs[i]);
    return {
        datasets: [
            { label: 'รายได้จริง (ชำระแล้ว)', data: paid, backgroundColor: pastelChartColors.green, stack: 'components' },
            { label: 'รอชำระเงิน (ออก Invoice แล้ว)', data: pendingPayment, backgroundColor: pastelChartColors.yellow, stack: 'components' },
            { label: 'รออนุมัติเอกสาร', data: pendingDocs, backgroundColor: pastelChartColors.pink, stack: 'components' },
            { label: 'ยอดรวม', data: totals, backgroundColor: pastelChartColors.blue, stack: 'total' } // แท่งนี้อยู่คนละ stack เพื่อให้แสดงแยกต่างหาก
        ]
    };
};

// --- ข้อมูลกราฟ: รายได้จากการสมัครสมาชิก (รายวัน/เดือน/ปี) โดยใช้ createRevenueData ---
const membershipRevenueDataDay = { labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'], ...createRevenueData( [1000, 1200, 1100, 1500, 2200, 2800, 3000], [200, 300, 200, 300, 300, 400, 500], [100, 150, 120, 180, 200, 250, 280] ) };
const membershipRevenueDataMonth = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], ...createRevenueData( [12000, 15000, 22000, 19000, 27000, 25000, 32000, 29000, 36000, 40000, 38000, 45000], [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 4000, 5000, 4000, 5000], [1500, 2000, 1800, 2200, 2500, 2100, 2800, 2600, 3000, 3200, 2900, 3500] ) };
const membershipRevenueDataYear = { labels: ['2566', '2567', '2568'], ...createRevenueData( [220000, 410000, 430000], [30000, 40000, 50000], [15000, 25000, 28000] ) };

// --- ข้อมูลอื่นๆ สำหรับตารางและกราฟ ---
const weeklyPostDataDay = { labels: ['จ','อ','พ','พฤ','ศ','ส','อา'], datasets: [ { label: 'ข่าว', data: [2, 3, 1, 4, 2, 5, 3], backgroundColor: pastelChartColors.blue }, { label: 'กิจกรรม', data: [1, 2, 2, 1, 3, 4, 2], backgroundColor: pastelChartColors.grey } ] };
const weeklyPostDataMonth = { labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], datasets: [ { label: 'ข่าว', data: [20, 22, 25, 23, 28, 30, 26, 29, 32, 35, 33, 38], backgroundColor: pastelChartColors.blue }, { label: 'กิจกรรม', data: [15, 18, 16, 20, 22, 25, 23, 26, 28, 30, 29, 32], backgroundColor: pastelChartColors.grey } ] };
const weeklyPostDataYear = { labels: ['2566', '2567', '2568'], datasets: [ { label: 'ข่าว', data: [350, 420, 400], backgroundColor: pastelChartColors.blue }, { label: 'กิจกรรม', data: [280, 310, 300], backgroundColor: pastelChartColors.grey } ] };
const topActivities = [ { id: 1, name: 'โครงการอบรมเชิงปฏิบัติด้าน IoT', popular: 50 }, { id: 2, name: 'การเขียนโปรแกรม Python สำหรับ IoT', popular: 45 }, { id: 3, name: 'ความปลอดภัยในระบบ IoT', popular: 42 }, { id: 4, name: 'Data Analytics for IoT', popular: 38 }, { id: 5, name: 'การสร้างระบบ Smart Home', popular: 35 } ];


// --- Component หลักของ Dashboard ---
const AdminDashboard = () => {
    // --- State Management ---
    // ใช้ useState เพื่อเก็บสถานะของ "ช่วงเวลา" (วัน/เดือน/ปี) ที่ผู้ใช้เลือกสำหรับแต่ละกราฟ
    const [timeframes, setTimeframes] = useState({
        memberRegistration: 'เดือน',
        monthlyLogin: 'เดือน',
        membershipRevenue: 'เดือน',
        weeklyPost: 'เดือน',
    });

    // --- Event Handlers ---
    // ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้คลิกปุ่มเปลี่ยนช่วงเวลา
    // มันจะอัปเดต state 'timeframes' สำหรับกราฟที่ระบุ (chart) ด้วยค่าใหม่ (value)
    const handleTimeframeChange = (chart, value) => {
        setTimeframes(prev => ({ ...prev, [chart]: value }));
    };

    // --- Data Selector Functions ---
    // กลุ่มฟังก์ชัน 'getActive...' ทำหน้าที่เลือกชุดข้อมูลที่ถูกต้องตามช่วงเวลาที่ผู้ใช้เลือกใน state
    const getActiveMemberChartData = () => {
        switch (timeframes.memberRegistration) {
            case 'วัน': return memberRegistrationDataDay;
            case 'ปี': return memberRegistrationDataYear;
            default: return memberRegistrationDataMonth;
        }
    };
    const getActiveLoginData = () => {
        switch (timeframes.monthlyLogin) {
            case 'วัน': return monthlyLoginDataDay;
            case 'ปี': return monthlyLoginDataYear;
            default: return monthlyLoginDataMonth;
        }
    };
    const getActiveRevenueData = () => {
        switch (timeframes.membershipRevenue) {
            case 'วัน': return membershipRevenueDataDay;
            case 'ปี': return membershipRevenueDataYear;
            default: return membershipRevenueDataMonth;
        }
    };
    const getActivePostData = () => {
        switch (timeframes.weeklyPost) {
            case 'วัน': return weeklyPostDataDay;
            case 'ปี': return weeklyPostDataYear;
            default: return weeklyPostDataMonth;
        }
    };

    // --- Memoized Calculation ---
    // ใช้ useMemo เพื่อคำนวณข้อมูลสมาชิกที่ใกล้หมดอายุ
    // การคำนวณนี้จะทำงานเพียงครั้งเดียวเมื่อ component โหลดครั้งแรก (เพราะ dependency array `[]` เป็นค่าว่าง)
    // เพื่อป้องกันการคำนวณซ้ำซ้อนที่อาจทำให้แอปช้าลง
    const expiringData = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ฟังก์ชันภายในสำหรับคำนวณวันที่เหลือ
        const getDaysRemaining = (expireDate) => {
            if (!expireDate) return Infinity;
            const exp = new Date(expireDate);
            exp.setHours(0, 0, 0, 0);
            if (exp < today) return -1; // หมดอายุแล้ว
            return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        };
        
        // 1. กรองเฉพาะสมาชิกรายปีที่ยัง active อยู่
        const activeAnnualMembers = membersData.filter(m =>
            m.type === 'paid' &&
            m.status === 'อนุมัติ' &&
            m.expirationDate
        );

        // 2. คำนวณจำนวนสมาชิกที่ใกล้หมดอายุในแต่ละช่วงเวลาสำหรับกราฟ
        const expiringIn7Days = activeAnnualMembers.filter(m => getDaysRemaining(m.expirationDate) <= 7).length;
        const expiringIn14Days = activeAnnualMembers.filter(m => {
            const days = getDaysRemaining(m.expirationDate);
            return days > 7 && days <= 14;
        }).length;
        const expiringIn30Days = activeAnnualMembers.filter(m => {
            const days = getDaysRemaining(m.expirationDate);
            return days > 14 && days <= 30;
        }).length;
        
        // 3. สร้าง object ข้อมูลสำหรับกราฟแท่ง
        const expiringMembersByTimeData = {
            labels: ['ใน 7 วัน', 'ใน 8-14 วัน', 'ใน 15-30 วัน'],
            datasets: [{
                label: 'จำนวนสมาชิก',
                data: [expiringIn7Days, expiringIn14Days, expiringIn30Days],
                backgroundColor: [pastelChartColors.pink, pastelChartColors.yellow, pastelChartColors.green],
                borderRadius: 4
            }]
        };
        
        // 4. สร้าง list ของสมาชิกที่ใกล้หมดอายุ 5 อันดับแรกสำหรับตาราง
        const expiringAnnualMembers = activeAnnualMembers
            .map(m => ({ ...m, remaining: getDaysRemaining(m.expirationDate) })) // เพิ่ม field 'remaining' เข้าไปใน object
            .filter(m => m.remaining !== Infinity && m.remaining >= 0) // กรองเอาเฉพาะคนที่ยังไม่หมดอายุ
            .sort((a, b) => a.remaining - b.remaining) // เรียงลำดับจากน้อยไปมาก (คนที่ใกล้หมดอายุที่สุดจะขึ้นก่อน)
            .slice(0, 5); // เอาแค่ 5 คนแรก

        // คืนค่าผลลัพธ์ทั้งสองในรูปแบบ object
        return { expiringMembersByTimeData, expiringAnnualMembers };
    }, []); // dependency array ว่างเปล่า = คำนวณแค่ครั้งเดียว

    // --- Helper Function for Rendering ---
    // ฟังก์ชันสำหรับสร้างปุ่มสถานะตามจำนวนวันที่เหลือ
    const getStatusButton = (remaining) => {
        if (remaining <= 7) return <button className="status-button status-danger">เหลือ {remaining} วัน</button>;
        if (remaining <= 30) return <button className="status-button status-warning">เหลือ {remaining} วัน</button>;
        return <button className="status-button status-success">ปกติ</button>;
    };

    // --- Render JSX ---
    // ส่วนนี้คือการวาดหน้าเว็บออกมาเป็น HTML
    return (
        <div className="admin-dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            
            {/* ส่วนของการ์ดสรุปข้อมูลด้านบน */}
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

            {/* ส่วนของ Grid ที่วางการ์ดกราฟและตาราง */}
            <div className="dashboard-grid">
                
                {/* กราฟ: จำนวนการสมัครสมาชิก */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header">
                        <h3 className="card-title">จำนวนการสมัครสมาชิก</h3>
                        <div className="timeframe-filter">
                            <button onClick={() => handleTimeframeChange('memberRegistration', 'วัน')} className={timeframes.memberRegistration === 'วัน' ? 'active' : ''}>วัน</button>
                            <button onClick={() => handleTimeframeChange('memberRegistration', 'เดือน')} className={timeframes.memberRegistration === 'เดือน' ? 'active' : ''}>เดือน</button>
                            <button onClick={() => handleTimeframeChange('memberRegistration', 'ปี')} className={timeframes.memberRegistration === 'ปี' ? 'active' : ''}>ปี</button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <div className="chart-inner-container">
                            <Bar options={groupedStackedBarChartOptions} data={getActiveMemberChartData()} />
                        </div>
                    </div>
                </div>

                {/* กราฟ: จำนวนการเข้าสู่ระบบ */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header">
                        <h3 className="card-title">จำนวนการเข้าสู่ระบบ</h3>
                        <div className="timeframe-filter">
                            <button onClick={() => handleTimeframeChange('monthlyLogin', 'วัน')} className={timeframes.monthlyLogin === 'วัน' ? 'active' : ''}>วัน</button>
                            <button onClick={() => handleTimeframeChange('monthlyLogin', 'เดือน')} className={timeframes.monthlyLogin === 'เดือน' ? 'active' : ''}>เดือน</button>
                            <button onClick={() => handleTimeframeChange('monthlyLogin', 'ปี')} className={timeframes.monthlyLogin === 'ปี' ? 'active' : ''}>ปี</button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <div className="chart-inner-container">
                            <Bar options={barChartOptions} data={getActiveLoginData()} />
                        </div>
                    </div>
                </div>

                {/* กราฟ: จำนวนสมาชิกในแต่ละแผน */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">จำนวนสมาชิกในแต่ละแผน</h3></div>
                    <div className="doughnut-chart-container">
                        <Doughnut options={doughnutChartOptions} data={memberPlanData} />
                    </div>
                </div>
                
                {/* กราฟ: รายได้จากการสมัครสมาชิก */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header">
                        <h3 className="card-title">รายได้จากการสมัครสมาชิก</h3>
                        <div className="timeframe-filter">
                            <button onClick={() => handleTimeframeChange('membershipRevenue', 'วัน')} className={timeframes.membershipRevenue === 'วัน' ? 'active' : ''}>วัน</button>
                            <button onClick={() => handleTimeframeChange('membershipRevenue', 'เดือน')} className={timeframes.membershipRevenue === 'เดือน' ? 'active' : ''}>เดือน</button>
                            <button onClick={() => handleTimeframeChange('membershipRevenue', 'ปี')} className={timeframes.membershipRevenue === 'ปี' ? 'active' : ''}>ปี</button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <div className="chart-inner-container">
                            <Bar options={groupedStackedBarChartOptions} data={getActiveRevenueData()} />
                        </div>
                    </div>
                </div>
                
                {/* กราฟ: โพสต์ข่าวและกิจกรรม */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header">
                        <h3 className="card-title">โพสต์ข่าวและกิจกรรม</h3>
                        <div className="timeframe-filter">
                            <button onClick={() => handleTimeframeChange('weeklyPost', 'วัน')} className={timeframes.weeklyPost === 'วัน' ? 'active' : ''}>วัน</button>
                            <button onClick={() => handleTimeframeChange('weeklyPost', 'เดือน')} className={timeframes.weeklyPost === 'เดือน' ? 'active' : ''}>เดือน</button>
                            <button onClick={() => handleTimeframeChange('weeklyPost', 'ปี')} className={timeframes.weeklyPost === 'ปี' ? 'active' : ''}>ปี</button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <div className="chart-inner-container">
                           <Bar options={barChartOptions} data={getActivePostData()} />
                        </div>
                    </div>
                </div>
                
                {/* ตาราง: 5 อันดับ กิจกรรมยอดนิยม */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">5 อันดับ กิจกรรมยอดนิยม</h3></div>
                    <div className="table-responsive-wrapper">
                        <table className="dashboard-table">
                            <thead><tr><th>อันดับ</th><th>ชื่อกิจกรรม</th><th>ผู้ลงทะเบียน</th></tr></thead>
                            <tbody>{topActivities.map((act, index) => (<tr key={act.id}><td>{index + 1}</td><td>{act.name}</td><td>{act.popular}</td></tr>))}</tbody>
                        </table>
                    </div>
                </div>

                {/* กราฟ: สมาชิกที่ใกล้หมดอายุ */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">สมาชิกที่ใกล้หมดอายุ</h3></div>
                    <div className="chart-wrapper">
                        <div className="chart-inner-container" style={{minWidth: '400px'}}>
                            {/* ใช้ข้อมูลจาก useMemo */}
                            <Bar options={barChartOptions} data={expiringData.expiringMembersByTimeData} />
                        </div>
                    </div>
                </div>
                
                {/* ตาราง: รายชื่อสมาชิกรายปีที่ใกล้หมดอายุ (5 อันดับแรก) */}
                <div className="dash-card grid-col-span-6">
                    <div className="card-header"><h3 className="card-title">รายชื่อสมาชิกรายปีที่ใกล้หมดอายุ (5 อันดับแรก)</h3></div>
                    <div className="table-responsive-wrapper">
                        <table className="dashboard-table">
                            <thead><tr><th>ชื่อสมาชิก</th><th>วันหมดอายุ</th><th>สถานะ</th></tr></thead>
                            <tbody>
                                {/* วนลูปข้อมูลจาก useMemo เพื่อสร้างแถวในตาราง */}
                                {expiringData.expiringAnnualMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td>{`${member.firstName} ${member.lastName}`}</td>
                                        <td>{new Date(member.expirationDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                        {/* เรียกใช้ฟังก์ชันเพื่อแสดงปุ่มสถานะ */}
                                        <td>{getStatusButton(member.remaining)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;