import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './MessageDetail.css';  // Import the custom CSS file

const MessageDetail = () => {
    const location = useLocation();
    const { messageId } = location.state || {};  // Get the messageId from state
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (messageId) {
            const fetchMessage = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/support/messages/${messageId}`, {
                        headers: {
                            'Authorization': localStorage.getItem('authToken'),
                        },
                    });
                    setMessage(response.data);
                } catch (error) {
                    console.error('Error fetching message:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMessage();
        } else {
            setLoading(false);  // Handle case where messageId is not available
        }
    }, [messageId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!message) {
        return <div className="message-not-found">Message not found</div>;
    }

    return (
        <div className="message-detail-container">
            <div className="message-header">
                <h2>Message Details</h2>
            </div>
            <div className="message-body">
                <div className="message-item">
                    <strong>Name:</strong> <span>{message.name}</span>
                </div>
                <div className="message-item">
                    <strong>Subject:</strong> <span>{message.subject}</span>
                </div>
                <div className="message-item">
                    <strong>Email:</strong>
                    {/* Make the sender's email clickable for admin to reply */}
                    <span>
                        <a href={`mailto:${message.email}`} className="email-link">
                            {message.email}
                        </a>
                    </span>
                </div>
                <div className="message-item">
                    <strong>Message:</strong>
                    <div className="message-content">{message.message}</div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetail;