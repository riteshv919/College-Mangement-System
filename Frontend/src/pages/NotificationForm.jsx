// NotificationForm.jsx
import React, { useState } from 'react';
import '../styles/NotificationForm.css';

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
        <div className="notification-form-container">
            <h1>Create Notification</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NotificationForm;