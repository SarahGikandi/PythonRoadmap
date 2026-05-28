import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFocusTracker } from '../hooks/useFocusTracker';
import { curriculum } from '../data/curriculum';
import WeekView from './WeekView';
import AntiJumpPanel from './AntiJumpPanel';
import DailyLog from './DailyLog';
import ProgressDashboard from './ProgressDashboard';

const Dashboard = ({ isFocusMode }) => {
    const { currentUser } = useAuth();
    const { profile, progress, loading, updateProgress, saveAntiJumpAttempt, saveDailyLog } = useFocusTracker(currentUser?.uid);
    const [selectedDay, setSelectedDay] = useState(null);

    if (!currentUser) return null;

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Syncing your progress...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-grid">
            <div className="main-content">
                <ProgressDashboard profile={profile} progress={progress} />

                {curriculum.map((week) => (
                    <WeekView
                        key={week.week}
                        week={week}
                        isCurrent={profile.currentWeek === week.week}
                        isFocusMode={isFocusMode}
                        onDaySelect={setSelectedDay}
                        updateProgress={updateProgress}
                        progress={progress[`week${week.week}`] || {}}
                    />
                ))}

                {selectedDay && (
                    <DailyLog
                        day={selectedDay}
                        onSave={saveDailyLog}
                        onClose={() => setSelectedDay(null)}
                    />
                )}
            </div>

            <aside className="sidebar">
                <AntiJumpPanel onAttempt={saveAntiJumpAttempt} />

                <div className="card philosophy">
                    <h2>Discipline Rule</h2>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                        "One day of focus is enough. Progress is a slow build, not a sprint."
                    </p>
                </div>
            </aside>
        </div>
    );
};

export default Dashboard;
