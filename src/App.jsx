import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './index.css';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [isFocusMode, setIsFocusMode] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className={`app-container ${isFocusMode ? 'focus-mode' : ''}`}>
      <header className="app-header">
        <h1>Python Focus Tracker</h1>
        <div className="header-actions">
          <button
            className={`toggle-btn ${isFocusMode ? 'active' : ''}`}
            onClick={() => setIsFocusMode(!isFocusMode)}
          >
            {isFocusMode ? 'Focus Mode: On' : 'Focus Mode: Off'}
          </button>
          <span className="user-email">{currentUser.email}</span>
        </div>
      </header>
      <main>
        <Dashboard isFocusMode={isFocusMode} />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
