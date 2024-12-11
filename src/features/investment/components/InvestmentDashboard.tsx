import React from 'react';

export const InvestmentDashboard: React.FC = () => {
  return (
    <div className="investment-dashboard">
      <div className="investment-card">
        <h1 className="investment-header">Investment Dashboard</h1>
        
        <div className="investment-stats">
          <div className="stat-card">
            <div className="stat-title">Total Investment</div>
            <div className="stat-value">$50,000</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Current Value</div>
            <div className="stat-value">$65,000</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">Total Return</div>
            <div className="stat-value">30%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
