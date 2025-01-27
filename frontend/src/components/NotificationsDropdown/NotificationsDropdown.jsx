import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NotificationsDropdown.css'; // Import custom CSS for styling

const NotificationsDropdown = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/support/messages', {
                headers: {
                    'Authorization': localStorage.getItem('authToken'),
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleViewMessage = (id) => {
        navigate('/notifications', { state: { messageId: id } });
    };

    return (
        <NavDropdown
            title="Notifications"
            id="notification-dropdown"
            className="custom-notification-dropdown"
        >
            {loading ? (
                <NavDropdown.Item className="dropdown-loading">Loading...</NavDropdown.Item>
            ) : messages.length > 0 ? (
                messages.map((msg) => (
                    <NavDropdown.Item
                        key={msg._id}
                        className="dropdown-item custom-dropdown-item"
                        onClick={() => handleViewMessage(msg._id)}
                    >
                        <div className="notification-header">
                            <strong>{msg.name}</strong>
                        </div>
                        <div className="notification-subject">{msg.subject}</div>
                    </NavDropdown.Item>
                ))
            ) : (
                <NavDropdown.Item className="dropdown-empty">
                    No notifications
                </NavDropdown.Item>
            )}
        </NavDropdown>
    );
};

export default NotificationsDropdown;
