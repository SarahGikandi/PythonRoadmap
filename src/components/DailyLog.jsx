import React, { useState } from 'react';

const DailyLog = ({ day, onSave, onClose }) => {
    const [log, setLog] = useState({
        understood: '',
        confused: '',
        tomorrowFocus: ''
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        const date = new Date().toISOString().split('T')[0];
        await onSave(date, { ...log, dayId: day.id });
        setSaving(false);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="card modal-content" style={{ maxWidth: '500px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Reflection: {day.title}</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                <div className="field">
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>What I understood</label>
                    <textarea
                        value={log.understood}
                        onChange={(e) => setLog({ ...log, understood: e.target.value })}
                        placeholder="Key takeaways..."
                    />
                </div>

                <div className="field" style={{ marginTop: '1.2rem' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>What confused me</label>
                    <textarea
                        value={log.confused}
                        onChange={(e) => setLog({ ...log, confused: e.target.value })}
                        placeholder="Areas for review..."
                    />
                </div>

                <div className="field" style={{ marginTop: '1.2rem' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tomorrow's focus</label>
                    <input
                        type="text"
                        value={log.tomorrowFocus}
                        onChange={(e) => setLog({ ...log, tomorrowFocus: e.target.value })}
                        placeholder="Specific goal..."
                    />
                </div>

                <button className="primary" style={{ width: '100%', marginTop: '2rem' }} onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Reflection'}
                </button>
            </div>
        </div>
    );
};

export default DailyLog;
