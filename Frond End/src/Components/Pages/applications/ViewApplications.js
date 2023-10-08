import React, { useState, useEffect } from 'react';
import './styling/ViewApplications.css';
import ApplicationController from '../../../Controllers/ApplicationController';

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [editingApplication, setEditingApplication] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            const applicationController = new ApplicationController();
            const fetchedApplications = await applicationController.getAllApplications();
            setApplications(fetchedApplications);
        };

        fetchApplications();
    }, []);

    const handleEdit = (application) => {
        setEditingApplication(application);
    };

    const handleRemove = async (applicationId) => {
        if (window.confirm('Are you sure you want to remove this application?')) {
            const applicationController = new ApplicationController();
            const removed = await applicationController.deleteApplication(applicationId);

            if (removed) {
                setApplications((prevApplications) =>
                    prevApplications.filter((app) => app.applicationId !== applicationId)
                );
            }
        }
    };

    const handleSaveEdit = async () => {
        if (editingApplication) {
            const applicationController = new ApplicationController();
            const updatedApplication = await applicationController.updateApplication(
                editingApplication
            );

            if (updatedApplication) {
                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app.applicationId === editingApplication.applicationId
                            ? editingApplication
                            : app
                    )
                );
                setEditingApplication(null);
            }
        }
    };

    return (
        <div className="view-applications-container">
            <h2>Created Applications ({applications.length})</h2>
            <table className="applications-table">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Closing Date</th>
                        <th>Access Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application.applicationId}>
                            <td>{application.applicationId}</td>
                            <td>
                                {editingApplication &&
                                editingApplication.applicationId === application.applicationId ? (
                                    <input
                                        type='text'
                                        value={editingApplication.details}
                                    />
                                ) : (
                                    application.details
                                )}
                            </td>
                            <td>
                                {editingApplication &&
                                editingApplication.applicationId === application.applicationId ? (
                                    <input
                                        type='text'
                                        value={editingApplication.department}
                                    />
                                ) : (
                                    application.department
                                )}
                            </td>
                            <td>
                                {editingApplication &&
                                editingApplication.applicationId === application.applicationId ? (
                                    <input
                                        type='date'
                                        value={editingApplication.dueDate}
                                    />
                                ) : (
                                    application.dueDate
                                )}
                            </td>
                            <td>
                                <a href={application.accessLink} target="_blank" rel="noopener noreferrer">
                                    Access Link
                                </a>
                            </td>
                            <td>
                                {editingApplication &&
                                editingApplication.applicationId === application.applicationId ? (
                                    <button onClick={handleSaveEdit}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(application)}>Edit</button>
                                        <button onClick={() => handleRemove(application.applicationId)}>Remove</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewApplications;
