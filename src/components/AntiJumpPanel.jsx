import React, { useState } from 'react';

const AntiJumpPanel = ({ onAttempt }) => {
    const [impulse, setImpulse] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!impulse.trim()) return;

        await onAttempt(impulse);
        setImpulse('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="card anti-jump">
            <h2>Anti-Jump Discipline</h2>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                Feeling an impulse to skip ahead? Document it here. This is for reflection, not action.
            </p>

            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                    What do you feel like jumping to?
                </label>
                <input
                    type="text"
                    value={impulse}
                    onChange={(e) => setImpulse(e.target.value)}
                    placeholder="e.g. I want to build a web scraper now"
                />
                <button type="submit" className="primary" style={{ width: '100%' }}>
                    Log Impulse
                </button>
            </form>

            {submitted && (
                <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', marginTop: '0.5rem', textAlign: 'center' }}>
                    Impulse noted. Stay focused on today.
                </p>
            )}
        </div>
    );
};

export default AntiJumpPanel;
