import React from 'react';
import './StatCard.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, trend, trendDirection, icon, theme }) => {
  const TrendIcon = trendDirection === 'up' ? FaArrowUp : FaArrowDown;

  return (
    <div className={`stat-card-item ${theme}`}>
      <div className="stat-card-icon-bg">{icon}</div>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className={`stat-card-trend ${trendDirection}`}>
          <span className="icon"><TrendIcon /></span>
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;