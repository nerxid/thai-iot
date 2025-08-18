import React from 'react';
import './StatCard.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// --- Component: การ์ดสำหรับแสดงข้อมูลสถิติแบบย่อ (Stat Card) ---
// เป็น Component ที่ใช้ซ้ำได้ (Reusable) สำหรับแสดงข้อมูลตัวเลขหลัก 1 ค่า พร้อมแนวโน้ม
// Props:
// - title: (string) ชื่อของสถิติ เช่น "จำนวนสมาชิก"
// - value: (string) ค่าของสถิติ เช่น "120"
// - trend: (string) ข้อความแสดงแนวโน้ม เช่น "+ 5"
// - trendDirection: (string) 'up' หรือ 'down' เพื่อกำหนดทิศทางลูกศรและสี
// - icon: (ReactElement) ไอคอนหลักของการ์ด
// - theme: (string) ชื่อ class สำหรับกำหนดชุดสีของการ์ด
const StatCard = ({ title, value, trend, trendDirection, icon, theme }) => {
  // --- Logic การเลือกไอคอนแนวโน้ม ---
  // ใช้ Ternary Operator เพื่อเลือกว่าจะแสดงไอคอนลูกศรขึ้น (FaArrowUp) หรือลง (FaArrowDown)
  // โดยดูจากค่าของ prop 'trendDirection'
  const TrendIcon = trendDirection === 'up' ? FaArrowUp : FaArrowDown;

  return (
    // Container หลักของการ์ด, รับ theme จาก props เพื่อเปลี่ยนสี
    <div className={`stat-card-item ${theme}`}>
      {/* ไอคอนหลักที่แสดงเป็นพื้นหลัง */}
      <div className="stat-card-icon-bg">{icon}</div>

      {/* ส่วนหัวของการ์ด */}
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
      </div>

      {/* ส่วนเนื้อหาของการ์ด */}
      <div className="stat-card-body">
        {/* ค่าสถิติหลัก */}
        <div className="stat-card-value">{value}</div>
        {/* ส่วนแสดงแนวโน้ม, รับ 'up' หรือ 'down' จาก props เพื่อเปลี่ยนสี */}
        <div className={`stat-card-trend ${trendDirection}`}>
          <span className="icon"><TrendIcon /></span>
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;