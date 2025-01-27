import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './MessageDetail.css';

const MessageDetail = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate hook
    const { messageId } = location.state || {};
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const resolveMessage = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/support/messages/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('authToken'),
                },
            });

            if (response.status === 200) {
                toast.success('Message resolved and deleted successfully.');
                // Navigate to the dashboard after a short delay
                setTimeout(() => {
                    navigate('/home'); // Replace with your dashboard route
                }, 3000);
            }
        } catch (error) {
            console.error('Error resolving message:', error);
        }
    };

    useEffect(() => {
        if (messageId) {
            const fetchMessage = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/support/messages/${messageId}`, {
                        headers: {
                            Authorization: localStorage.getItem('authToken'),
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
            setLoading(false);
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
            <ToastContainer /> {/* Toast container for displaying notifications */}
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
                <div className="resolve">
                    <button className="resolve-button" onClick={() => resolveMessage(message._id)}>
                        Resolve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageDetail;
