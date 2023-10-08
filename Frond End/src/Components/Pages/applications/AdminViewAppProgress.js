import React, { useState } from 'react';
import './styling/AdminViewAppProgress.css'; // Import your CSS file with unique class names
import ViewApplications from './ViewApplications';
import ViewApplicationSubmissions from './ViewApplicationSubmissions';

const AdminViewAppProgress = () => {
    const [view, setView] = useState('created');

    return (
        <div className="admin-view-app-progress-container">
            <h2 className="admin-view-app-progress-title">Applications</h2>
            <div className="view-buttons">
                <button
                    className={`view-button ${view === 'created' ? 'active' : ''}`}
                    onClick={() => setView('created')}
                >
                    Created
                </button>
                <button
                    className={`view-button ${view === 'submitted' ? 'active' : ''}`}
                    onClick={() => setView('submitted')}
                >
                    Submitted
                </button>
            </div>
            <div className="view-content">
                {view === 'created' ? <ViewApplications /> : <ViewApplicationSubmissions />}
            </div>
        </div>
    );
};

export default AdminViewAppProgress;

