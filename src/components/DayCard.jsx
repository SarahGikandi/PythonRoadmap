import React from 'react';

const DayCard = ({ day, week, isFocusMode, onSelect, updateProgress, data }) => {
    const { done = false, confidence = 0, note = '' } = data;

    const handleToggle = async (e) => {
        const val = e.target.checked;
        await updateProgress(week, day.id, { done: val, confidence, note });
        if (val && !done) onSelect(); // Open reflection on completion
    };

    const handleConfidence = async (val) => {
        await updateProgress(week, day.id, { done, confidence: val, note });
    };

    const isToday = day.id === 1; // Simplified logic

    return (
        <div className={`card day-card ${done ? 'completed' : ''} ${isToday ? 'today' : ''}`}>
            <div className="day-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={handleToggle}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <h3>Day {day.id}: {day.title}</h3>
                </div>
                <button
                    onClick={onSelect}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    {done ? 'View Notes' : 'Add Note'}
                </button>
            </div>

            {!done && (
                <div style={{ marginTop: '0.8rem', paddingLeft: '30px' }}>
                    <ul style={{ fontSize: '0.85rem', color: '#666', listStyleType: 'circle' }}>
                        {day.topics.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>
            )}

            {done && (
                <div style={{ marginTop: '1rem', paddingLeft: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>Confidence:</span>
                        {[1, 2, 3, 4, 5].map(n => (
                            <span
                                key={n}
                                onClick={() => handleConfidence(n)}
                                style={{
                                    cursor: 'pointer',
                                    color: n <= confidence ? 'var(--accent-color)' : '#ddd',
                                    fontSize: '1.2rem'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    {note && (
                        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', fontStyle: 'italic' }}>
                            "{note}"
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DayCard;
