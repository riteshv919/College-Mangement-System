// Notification.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

const NotificationForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const notificationData = { title, description };

        try {
            const response = await fetch('http://localhost:3002/submit-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notificationData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit notification. Check the console for details.');
        }
    };


    return (
        <div className="notification-container">
            <h1>Student Dashboard</h1>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification._id} className="notification-item">
                            <h3 className="notification-title">{notification.title}</h3>
                            <p className="notification-description">{notification.description}</p>
                            <small className="notification-date">
                                {new Date(notification.date).toLocaleString()}
                            </small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications found.</p>
            )}
        </div>
    );
};

export default Notification;