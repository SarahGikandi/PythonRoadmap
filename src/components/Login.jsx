import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { loginWithGoogle } = useAuth();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Login failed", error);
            alert("Authentication failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>
                Python Focus Tracker
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '1.1rem' }}>
                A disciplined, 4-week journey into Python.
                <br />
                <span style={{ opacity: 0.8, fontSize: '0.9rem' }}>No skips, no rushes, just consistency.</span>
            </p>
            <button className="google-btn" onClick={handleLogin}>
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg"
                    alt="Google"
                    width="18"
                />
                Sign in with Google
            </button>

            <div style={{ marginTop: '4rem', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '1px' }}>
                D I S C I P L I N E &nbsp; | &nbsp; G R O W T H
            </div>
        </div>
    );
};

export default Login;
