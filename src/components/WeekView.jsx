import React from 'react';
import DayCard from './DayCard';

const WeekView = ({ week, isCurrent, isFocusMode, onDaySelect, updateProgress, progress }) => {
    return (
        <div className={`week-container ${isCurrent ? 'current-week' : ''}`}>
            <h2 className="week-title">
                Week {week.week}: {week.title}
                {isCurrent && <span className="badge">Current</span>}
            </h2>
            <div className="days-grid">
                {week.days.map((day) => (
                    <DayCard
                        key={day.id}
                        day={day}
                        week={week.week}
                        isFocusMode={isFocusMode}
                        onSelect={() => onDaySelect(day)}
                        updateProgress={updateProgress}
                        data={progress[`day${day.id}`] || {}}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeekView;
