import React from 'react';

const ProgressDashboard = ({ profile, progress }) => {
    const totalDays = 28;

    let completedDays = 0;
    Object.values(progress).forEach(weekData => {
        Object.values(weekData).forEach(dayData => {
            if (dayData.done) completedDays++;
        });
    });

    const percentage = Math.round((completedDays / totalDays) * 100);

    return (
        <div className="card progress-stats">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2>Progress Dashboard</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Week {profile.currentWeek}</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>Overall Completion</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-color)' }}>{percentage}%</span>
                </div>
                <div className="progress-bar-bg" style={{ ...barBgStyle, backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
                    <div className="progress-bar-fill" style={{ ...barFillStyle, width: `${percentage}%` }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                    {completedDays} of {totalDays} days completed. Remember: consistency &gt; speed.
                </p>
            </div>
        </div>
    );
};

const barBgStyle = {
    height: '10px', borderRadius: '5px', overflow: 'hidden'
};

const barFillStyle = {
    height: '100%', backgroundColor: 'var(--accent-color)', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
};

export default ProgressDashboard;
